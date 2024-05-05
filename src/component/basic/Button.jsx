import "../../styles/basic/Button.css";

export default function Button({ size, onCilck, color, text }) {
  const className = `Button ${size} ${color}`;
  return (
    <button className={className} onClick={onCilck}>
      {text}
    </button>
  );
}
