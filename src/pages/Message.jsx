import { Link } from "react-router-dom";
import axios from "axios";
import apiClient from "../util/BaseUrl";
export default function Message() {
  const a = async () => {
    const response = await apiClient.get("/api/v1/chat/index?memberId=1");
    console.log(response);
  };

  return (
    <div>
      {/* <Link to={"/Home"}> */}
      <button onClick={a}>
        ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      </button>
      {/* </Link>  */}
    </div>
  );
}
