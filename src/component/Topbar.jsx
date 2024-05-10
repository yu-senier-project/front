import "../styles/basic/tobbar.css";
import { Link } from "react-router-dom";
export default function Tobbar() {
  return (
    <div id="tobbar">
      <b>
        <i>
          <Link to={"/"}>CNS</Link>
        </i>
      </b>
    </div>
  );
}
