import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/find/Find.css";
import TopBar from "../../components/TopBar";
import Check_ID from "../../components/CheckID";

export default function FindId() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [timer, setTimer] = useState(null);
  const [authCode, setauthCode] = useState("");
  const [email, setemail] = useState("");
  const [isAuth, setisAuth] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const _authCode = "123456";

  const saveAuth = (event) => {
    setauthCode(event.target.value);
  };

  function authentication() {
    if (authCode === _authCode) {
      setisAuth(true);
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  }

  function toggleCheck() {
    if (!isClickable) return;
    setIsChecked(true);
    setIsClickable(false);
    setTimer(60);
  }

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsChecked(false);
      setIsClickable(true);
      setTimer(null);
    }
  });

  const goCheck_ID = (event) => {
    if (isAuth) {
      setIsNext(true);
    } else {
      alert("인증을 완료해 주세요.");
    }
  };

  const goFind_PW = (event) => {
    navigate("/user/FindPW")
  };

  function cancle() {
    navigate("/");
  }

  return (
    <div>
      <TopBar />
      {!isNext ? (
        <>
          <div className="findId_bg">
              <div className="findId_title">아이디 찾기</div>
              <div className="find_text">
                아이디를 찾기 위해서 이메일 인증을 진행해주세요
              </div>
              {/* 이메일 작성 폼 */}
              <div className="find_email_top">
                <input
                  type="text"
                  placeholder="Email"
                  className="find_email"
                ></input>
                {/* 인증 메일 전송 버튼 */}
                <button
                  className="find_send_email"
                  onClick={toggleCheck}
                  disabled={!isClickable}
                >
                  {isChecked ? "✔️" : "인증메일 전송"}
                </button>
              </div>
              <div className="find_auth_top">
              <div className="find_authentication">
                 {/* 인증번호 작성 폼*/}
                  <input
                    className="find_authentication_number"
                    type="text"
                    placeholder="인증번호"
                    onChange={saveAuth}
                  ></input>
                  <button
                    className="find_authentication_btn"
                    onClick={authentication}
                  >
                    인증
                  </button>
              </div>
              <p className="find_timer">{timer}</p>
              </div>
             <button className="find_next_btn"  onClick={goCheck_ID}>아이디 찾기</button>
              <div className="find_navigate_other">
              {/* 로그인 페이지로 가기 버튼 */}
              <button className="find_navigate_login" onClick={cancle}>
                로그인 페이지로 가기
              </button>
              <div className="vline"></div>
              {/* 비밀번호 찾기로 가기 버튼 */}
              <button className="find_navigate_findpw" onClick={goFind_PW}>
                비밀번호 찾기
              </button>
              </div>

          </div>
          
        </>
      ) : (
        <Check_ID />
      )}
    </div>
  );
}
