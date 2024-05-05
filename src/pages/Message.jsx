import { Link } from "react-router-dom";
import axios from "axios";
export default function Message() {
  return (
    <div>
      <Link to={"/Home"}>
        <button
          onClick={() => {
            axios
              .get("http://13.51.99.142:8080/api/v1/auth/register/check/123")
              .then((res) => {
                console.log(res);
              });
          }}
        >
          ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        </button>
      </Link>
    </div>
  );
}
