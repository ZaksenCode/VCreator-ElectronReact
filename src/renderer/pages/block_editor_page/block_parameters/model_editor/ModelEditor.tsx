import './ModelEditor.scss';
import { useEffect, useMemo, useState } from 'react';
import { AABBPrimitive, Block, ModelPrimitives, ModStructure, TextureMetadata } from '../../../../../types';
import BlockPreview from '../block_preview/BlockPreview';
import { Store } from 'react-notifications-component';
import { getBlockTextures } from '../../../../utils';
import ChangeTextureModal from '../change_texture_modal/ChangeTextureModal';


const showWarning = (
  message: string
) => {
  Store.addNotification({
    title: 'Осторожно',
    message: message,
    type: 'warning',
    insert: 'top',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

type ModelType =
  'no-model' |
  'block-with-texture' |
  'custom-model'

interface CustomModelEditorProps {
  textures: TextureMetadata[]
  primitives: ModelPrimitives,

  updatePrimitives(newPrimitives: ModelPrimitives): void
}

function CustomModelEditor({ textures, primitives, updatePrimitives }: CustomModelEditorProps) {
  const [localAabbs, setLocalAabbs] = useState(primitives.aabbs);
  const [editingTextureIndex, setEditingTextureIndex] = useState(0)
  const [editingPrimitivesIndex, setEditingPrimitivesIndex] = useState(0)

  const [textureDialogIsShowing, setTextureDialogIsShowing] = useState(false)

  useEffect(() => {
    setLocalAabbs(primitives.aabbs);
  }, [primitives.aabbs]);

  const handleInputChange = (index: number, value: number, dimension: number) => {
    const updatedAabbs = [...localAabbs];
    updatedAabbs[index][dimension] = value;
    setLocalAabbs(updatedAabbs);
    updatePrimitives({ aabbs: updatedAabbs });
  };

  const addPrimitive = () => {
    const newPrimitive: AABBPrimitive = [0, 0, 0, 1, 1, 1, 'notfound', 'notfound', 'notfound', 'notfound', 'notfound', 'notfound'];
    const updatedPrimitives = [...localAabbs, newPrimitive];
    setLocalAabbs(updatedPrimitives);
    updatePrimitives({ aabbs: updatedPrimitives });
  };

  const removePrimitive = (index: number) => {
    const updatedAabbs = localAabbs.filter((_, i) => i !== index);
    setLocalAabbs(updatedAabbs);
    updatePrimitives({ aabbs: updatedAabbs });
  };

  const getTexture = (name: string): TextureMetadata | undefined => {
    return textures.find((texture) => {
      const textureName = texture.name.replace(/\.[^/.]+$/, '');
      if (textureName == name) {
        return texture;
      }
    });
  };

  const handleTextureClick = (primIndex: number, textureIndex: number) => {
    setEditingTextureIndex(textureIndex)
    setEditingPrimitivesIndex(primIndex)
    setTextureDialogIsShowing(true)
  };

  const handleTextureDialogSelect = (file: TextureMetadata) => {
    const updatedAabbs = [...localAabbs];
    updatedAabbs[editingPrimitivesIndex][editingTextureIndex] = file.name.replace(/\.[^/.]+$/, '');
    setLocalAabbs(updatedAabbs);
    updatePrimitives({ aabbs: updatedAabbs });
    setEditingTextureIndex(0)
    setEditingPrimitivesIndex(0)
    setTextureDialogIsShowing(false)
  }

  return (
    <div className='custom-model-editor'>
      {localAabbs.map((aabb, index) => (
        <div className='aabb-prim' key={index}>
          {(localAabbs.length > 1) &&
            <button className='remove' onClick={() => removePrimitive(index)}>Удалить примитив</button>}
          <div className='offsets'>
            <label>Offset</label>
            <input
              type='number'
              value={aabb[0]}
              step='0.05'
              onChange={(e) => handleInputChange(index, parseFloat(e.target.value), 0)}
            />
            <input
              type='number'
              value={aabb[1]}
              step='0.05'
              onChange={(e) => handleInputChange(index, parseFloat(e.target.value), 1)}
            />
            <input
              type='number'
              value={aabb[2]}
              step='0.05'
              onChange={(e) => handleInputChange(index, parseFloat(e.target.value), 2)}
            />
          </div>
          <div className='sizes'>
            <label>Size</label>
            <input
              type='number'
              value={aabb[3]}
              step='0.05'
              onChange={(e) => handleInputChange(index, parseFloat(e.target.value), 3)}
            />
            <input
              type='number'
              value={aabb[4]}
              step='0.05'
              onChange={(e) => handleInputChange(index, parseFloat(e.target.value), 4)}
            />
            <input
              type='number'
              value={aabb[5]}
              step='0.05'
              onChange={(e) => handleInputChange(index, parseFloat(e.target.value), 5)}
            />
          </div>
          <div className='textures'>
            {[6, 7, 8, 9, 10, 11].map((textureIndex) => {
              const textureName = aabb[textureIndex];
              if (typeof textureName == 'number') return null;
              const texture = getTexture(textureName);
              return (
                <div key={textureIndex}
                     className='texture'
                     onClick={() => handleTextureClick(index, textureIndex)}>
                  <img
                    src={texture?.content}
                    alt={texture?.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button className='add' onClick={() => addPrimitive()}>Добавить примитив</button>
      <ChangeTextureModal textures={textures} onClose={()=>{setTextureDialogIsShowing(false)}} onSubmit={handleTextureDialogSelect} isOpen={textureDialogIsShowing}/>
    </div>
  );
}

interface ModelEditorProps {
  modStructure: ModStructure;
  block: Block;
  modPath: string;

  onSave(newBlock: Block): void;
}

export default function ModelEditor({ modStructure, block, modPath, onSave }: ModelEditorProps) {
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [activeTab, setActiveTab] = useState<ModelType | null>(null);
  const [confirmationTab, setConfirmationTab] = useState<ModelType | null>(null);
  const [isNeedSave, setIsNeedSave] = useState(false);

  // getBlockTextures
  useEffect(() => {
    setEditingBlock(block);
    if (block.texture || block['texture-faces']) {
      setActiveTab('block-with-texture');
    } else if (block.model == 'custom' && block['model-primitives']) {
      setActiveTab('custom-model');
    } else {
      setActiveTab('no-model');
    }
    setIsNeedSave(false);
  }, [block]);

  const textures = useMemo(() => getBlockTextures(modStructure),
    [modStructure]
  );

  if (!editingBlock || !activeTab) return null;

  const dismissUpdates = () => {
    if (block.texture || block['texture-faces']) {
      setActiveTab('block-with-texture');
    } else if (block.model == 'custom' && block['model-primitives']) {
      setActiveTab('custom-model');
    } else {
      setActiveTab('no-model');
    }
    setEditingBlock(block);
    setIsNeedSave(false);
  };

  const saveUpdates = () => {
    onSave(editingBlock);
    setIsNeedSave(false);
  };

  const setNoModel = () => {
    const updatedBlock: Block = {
      ...editingBlock,
      ['texture']: null,
      ['texture-faces']: null,
      ['model']: null,
      ['model-primitives']: null,
      ['hitbox']: null
    };
    if (!isNeedSave) setIsNeedSave(true);
    setEditingBlock(updatedBlock);
  };

  const setStandardModel = () => {
    const updatedBlock: Block = {
      ...editingBlock,
      ['texture']: 'notfound',
      ['texture-faces']: null,
      ['model']: null,
      ['model-primitives']: null,
      ['hitbox']: [0, 0, 0, 1, 1, 1]
    };
    if (!isNeedSave) setIsNeedSave(true);
    setEditingBlock(updatedBlock);
  };

  const setCustomModel = () => {
    const updatedBlock: Block = {
      ...editingBlock,
      ['texture']: null,
      ['texture-faces']: null,
      ['model']: 'custom',
      ['model-primitives']: {
        aabbs: [
          [0, 0, 0, 1, 1, 1, 'notfound', 'notfound', 'notfound', 'notfound', 'notfound', 'notfound']
        ]
      },
      ['hitbox']: [0, 0, 0, 1, 1, 1]
    };
    if (!isNeedSave) setIsNeedSave(true);
    setEditingBlock(updatedBlock);
  };


  const handleTabClick = (tabName: ModelType) => {
    if (tabName == 'no-model' && !confirmationTab) {
      setConfirmationTab('no-model');
      showWarning('Это действие удалит текущую модель. Вы уверены, что хотите этого?. Нажмите повторно для приминения');
    } else {
      if (tabName == 'no-model') {
        setNoModel();
      }
      if (tabName == 'block-with-texture') {
        setStandardModel();
      }
      if (tabName == 'custom-model') {
        setCustomModel();
      }
      setConfirmationTab(null);
      setActiveTab(tabName);
    }
  };

  return (
    <div className={`model-editor ${activeTab === 'no-model' ? 'no-panel' : ''}`}>
      <BlockPreview block={editingBlock} modPath={modPath} />
      <div className='model-editor-content'>
        <div className={`model-editor-tabs ${activeTab === 'no-model' ? 'no-panel' : ''}`}>
          <div className={`tab ${activeTab === 'no-model' ? 'active' : ''}`}
               onClick={() => handleTabClick('no-model')}>Без модели
          </div>
          <div className={`tab ${activeTab === 'block-with-texture' ? 'active' : ''}`}
               onClick={() => handleTabClick('block-with-texture')}>Стандартная модель
          </div>
          <div className={`tab ${activeTab === 'custom-model' ? 'active' : ''}`}
               onClick={() => handleTabClick('custom-model')}>Кастомная модель
          </div>
        </div>
        {activeTab === 'block-with-texture' && (
          <div className='model-editor-panel'>
            <div className='panel-content'>
              <div className=''>Текстура: тут выбираем текстуру</div>
              <div className=''>Текстуры для сторон: Выбираем несколько текстур</div>
            </div>
          </div>
        )}
        {activeTab === 'custom-model' && (
          <div className='model-editor-panel'>
            <div className='panel-content'>
              {editingBlock['model-primitives'] &&
                <CustomModelEditor textures={textures} primitives={editingBlock['model-primitives']}
                                   updatePrimitives={(newPrimitives) => {
                                     if (!isNeedSave) setIsNeedSave(true);
                                     setEditingBlock({
                                       ...editingBlock,
                                       ['model-primitives']: newPrimitives
                                     });
                                   }} />}
            </div>
          </div>
        )}

        {
          isNeedSave && (<div className='action-group'>
            <button className={'cancel'} onClick={dismissUpdates}>Отменить</button>
            <button className={'save'} onClick={saveUpdates}>Сохранить</button>
          </div>)
        }

      </div>
    </div>
  );
}
