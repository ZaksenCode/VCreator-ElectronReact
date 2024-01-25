import './Button.scss';

export enum ButtonType {
  Primary = 'primary',
}

interface ButtonProps {
  onClick: Function;
  text: string;
  type: ButtonType;
}

function Button({ onClick, text, type }: ButtonProps) {
  const classes = `v_button ${type}`
  return (
    <button
      type="button"
      className={classes}
      onClick={() => onClick()}
    >
      <span className="button_span">{text}</span>
    </button>
  );
}

export default Button;
