import './Button.scss';
import ClassUtils from '../../../main/utils/classes';

export enum ButtonType {
  Primary = 'primary',
}

interface ButtonProps {
  onClick: Function;
  text: string;
  type: ButtonType;
}

function Button({ onClick, text, type }: ButtonProps) {
  const classes = {
    v_button: true,
    [type]: true,
  };
  const buttonClassNames = ClassUtils.classNames(classes);
  return (
    <button
      type="button"
      className={buttonClassNames}
      onClick={() => onClick()}
    >
      <span className="button_span">{text}</span>
    </button>
  );
}

export default Button;
