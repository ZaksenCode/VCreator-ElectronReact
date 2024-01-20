import './EditableValue.scss';

export enum ValueBoxType {
    CheckBox,
    ComboBox,
    Settings,
    NumericInt
}

interface ValueBoxProps {
    valueName: string
    valueDescription: string
    valueType: ValueBoxType
}

function EditableValue(props: ValueBoxProps) {
    return (
        <div className="value-box">
            <div className="value-box-name">
                
            </div>
        </div>
    )
}

export default EditableValue;