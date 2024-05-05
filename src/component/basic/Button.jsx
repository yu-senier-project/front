import "../../styles/basic/Button.css";

export default function Button({ size, onCilck, color, text, fontSize }) {
  const className = `Button ${size} ${color} font-${fontSize}`;
  return (
    <button className={className} onClick={onCilck}>
      {text}
    </button>
  );
}
