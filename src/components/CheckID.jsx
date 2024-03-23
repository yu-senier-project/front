import { useNavigate } from "react-router-dom";
import "../css/find/Check.css";
import TopBar from "./TopBar";
export default function Check_ID() {
  const movePage = useNavigate();
  const authentication = false;

  function goLogin() {
    movePage("/");
  }
  return (
    <div>
      <div className="check_bg">
        <p className="check_title">아이디 찾기</p>
        <hr />
        <div className="check_content">
          <p>입력하신 정보와 일치하는 아이디는 아래와 같습니다</p>
        </div>
        <div className="check_id">
          <p>
            <b>jmk101711</b>
          </p>
        </div>
        <button className="check_navigate_find_pw">비밀번호 찾기</button>
        <button className="check_next_btn" onClick={goLogin}>
          <b>로그인 페이지로 가기</b>
        </button>
      </div>
    </div>
  );
}
