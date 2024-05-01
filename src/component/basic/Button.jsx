import "../../styles/basic/Button.css";

export default function Button({ size, oncilck, color, text, fontSize }) {
  const className = `Button ${size} ${color} font-${fontSize}`;
  return (
    <button className={className} onClick={oncilck}>
      {text}
    </button>
  );
}
