import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const movePage = useNavigate();

  function goLogin() {
    movePage("/Login");
  }

  return (
    <header>
      <div className="top_bar">
        <button onClick={goLogin} className="top_bar_name">
          CNS
        </button>
        <div className="top_bar_login">
          <input placeholder="아이디" className="top_bar_id"></input>
          <input placeholder="비밀번호" className="top_bar_pw"></input>
          <button className="top_bar_login_btn">로그인</button>
        </div>
      </div>
    </header>
  );
}
