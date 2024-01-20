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
    // Todo -> difrent value elements from selected type (ValueBoxType)
    return (
        <div className="value-box">
            <div className="value-box-name">
                {props.valueName}
            </div>
        </div>
    )
}

export default EditableValue;