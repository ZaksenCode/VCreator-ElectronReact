import './BlockPreview.scss';
import * as THREE from 'three';
import { Block } from '../../../../../types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

/**
 * Загрузка текстуры
 * @param modPath - путь до мода
 * @param textureName - название текстуры
 */
const loadTexture = async (modPath: string, textureName: string) => {
  const texturePath = `${modPath}/textures/blocks/${textureName}.png`;
  const textureData = await window.electron.ipcRenderer.loadTexture(texturePath);

  const texture = new THREE.TextureLoader().load(textureData);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
};

interface CrossModelProps {
  block: Block;
  modPath: string;
}

const CrossModel = ({ block, modPath }: CrossModelProps) => {
  const [textureData, setTextureData] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const textureName = block.texture ? block.texture : null;
    textureName && loadTexture(modPath, textureName).then(result => {
      setTextureData(result);
    });
  }, [block]);

  if (!textureData) return null;
  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <meshBasicMaterial attach="material" map={textureData} side={THREE.DoubleSide} transparent={true}  depthWrite={false}  />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <meshBasicMaterial attach="material" map={textureData} side={THREE.DoubleSide} transparent={true} depthWrite={false} />
      </mesh>
    </group>
  );
};


interface CustomModelProps {
  block: Block;
  modPath: string;
}

const CustomModel = ({ block, modPath }: CustomModelProps) => {
  const modelPrimitives = block['model-primitives'];
  if (!modelPrimitives || !modelPrimitives.aabbs) return null;

  const [loadedTextures, setLoadedTextures] = useState({});

  useEffect(() => {
    const loadAllTextures = async () => {
      // @ts-ignore
      const allTextureNames: string[] = modelPrimitives.aabbs.flatMap(primitive => primitive.slice(6, 12));
      const uniqueTextureNames = [...new Set(allTextureNames)];

      const textures = await Promise.all(uniqueTextureNames.map(async (name) => {
        const texture = await loadTexture(modPath, name);
        return [name, texture];
      }));

      setLoadedTextures(Object.fromEntries(textures));
    };

    loadAllTextures();
  }, [modelPrimitives, modPath]);

  const objects = useMemo(() => modelPrimitives.aabbs.map((primitive) => {

    // @ts-ignore
    const [offsetX, offsetY, offsetZ, sizeX, sizeY, sizeZ]: number[] = primitive.slice(0, 6);
    const textureNames = primitive.slice(6, 12);

    const textures = textureNames.map(name => {
      // @ts-ignore
      const texture = loadedTextures[name];
      return texture ? texture : null;
    }).filter(Boolean);

    const temp = textures[2];
    textures[2] = textures[3];
    textures[3] = temp;

    return {
      position: new THREE.Vector3(offsetX + sizeX / 2, offsetY + sizeY / 2, offsetZ + sizeZ / 2),
      geometry: <boxGeometry attach='geometry' args={[sizeX, sizeY, sizeZ]} />,
      materials: textures.map((texture, index) => texture && <meshStandardMaterial
        key={index}
        attach={`material-${index}`}
        map={texture}
        transparent={true}
      />)
    };
  }), [modelPrimitives, loadedTextures]);

  const center = useMemo(() => {
    const box = new THREE.Box3();
    objects.forEach(obj => {
      box.expandByPoint(obj.position);
    });
    return box.getCenter(new THREE.Vector3());
  }, [objects]);

  return (
    <group position={[-center.x, -center.y, -center.z]}>
      {objects.map((obj, index) => (
        <mesh key={index} position={obj.position}>
          {obj.geometry}
          {obj.materials}
        </mesh>
      ))}
    </group>
  );
};


interface SimpleBlockModelProps {
  block: Block;
  modPath: string;
}

function SimpleBlockModel({ block, modPath }: SimpleBlockModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textureData, setTextureData] = useState<THREE.Texture[] | null>(null);
  useEffect(() => {
    const textureName = block.texture ? block.texture : null;
    textureName && loadTexture(modPath, textureName).then(result => {
      setTextureData([result]);
    });

    const textureNames = block['texture-faces'] ? block['texture-faces'] : null;
    const texturePromises = textureNames && textureNames.map((textureName) => {
      return loadTexture(modPath, textureName);
    });
    texturePromises && Promise.all(texturePromises).then(result => {
      const temp = result[2];
      result[2] = result[3];
      result[3] = temp;
      setTextureData(result);
    });

  }, [block]);

  if (!textureData) return null;
  const hitbox = block.hitbox ? block.hitbox : [0, 0, 0, 1, 1, 1];
  const geometry = new THREE.BoxGeometry(hitbox[3], hitbox[4], hitbox[5]);
  // useFrame((state, delta) => {
  //   if (!meshRef.current) return
  //   meshRef.current.rotation.x += delta;
  //   meshRef.current.rotation.y += delta;
  // });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={3}>
      {textureData.length == 1 ?
        <meshStandardMaterial
          attach='material'
          map={textureData[0]}
          transparent={true}
        /> :
        textureData.map((texture, index) =>
          <meshStandardMaterial
            key={index}
            attach={`material-${index}`}
            map={texture}
            transparent={true}
          />
        )
      }
    </mesh>
  );
}


interface BlockPreviewProps {
  block: Block,
  modPath: string
}

export default function BlockPreview({ block, modPath }: BlockPreviewProps) {

  console.log(block)

  const modelRenderer = useMemo(() => {
      if (block.texture && block.model == 'X')
        return <CrossModel block={block} modPath={modPath} />
      if (block.texture || block['texture-faces'])
        return <SimpleBlockModel block={block} modPath={modPath} />;
      if (block.model == 'custom')
        return <CustomModel block={block} modPath={modPath} />;
      return null;

  }, [block.texture, block.model, block.hitbox, block['texture-faces'], block['model-primitives']])

  return modelRenderer ?
    (
      <div className='block-viewer'>
        <Canvas>
          <OrbitControls
            enableDamping={false}
            enablePan={false}
          />
          <ambientLight intensity={Math.PI / 1.2} />
          {modelRenderer}
        </Canvas>
      </div>
    ) : null;
}


// <div className='block-viewer'>
//   <Canvas>
//     <OrbitControls
//       enableDamping={false}
//       enablePan={false}
//     />
//     <ambientLight intensity={Math.PI / 1.2} />
//     <pointLight />
//     {selectModelRenderer()}
//   </Canvas>
// </div>
