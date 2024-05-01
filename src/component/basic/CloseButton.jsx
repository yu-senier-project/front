import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../../styles/basic/CloseButton.scss";

const CloseButton = ({ size, onCloseButton }) => {
  const style = {
    fontSize: `${size}px`,
    cursor: "pointer",
  };
  return (
    <button className="CloseButton" onClick={onCloseButton}>
      <FontAwesomeIcon icon={faX} style={style} />
    </button>
  );
};

export default CloseButton;
