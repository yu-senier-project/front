import { useNavigate } from "react-router-dom";
import "../css/find/Check.css";
import TopBar from "./TopBar";
export default function Check_ID() {
  const movePage = useNavigate();
  const authentication = false;

  function goLogin() {
    movePage("/Login");
  }
  return (
    <div>
      <div className="check_bg">
        <div className="check_main">
          <p className="check_title">아이디 찾기</p>
          <hr />
          <div className="check_content">
            <p>회원님의 아이디는 아래와 같습니다</p>
          </div>
          <div className="check_id">
            <p>jmk101711</p>
          </div>
          <button className="check_next_btn" onClick={goLogin}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
