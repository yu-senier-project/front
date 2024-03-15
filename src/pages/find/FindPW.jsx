import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/find/Find.css";
import TopBar from "../../components/TopBar";
import Check_PW from "../../components/CheckPW";
export default function FindId() {
  const movePage = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [timer, setTimer] = useState(null);
  const [authCode, setauthCode] = useState("");
  const [email, setemail] = useState("");
  const [isAuth, setisAuth] = useState(false);
  const [isNext, setisNext] = useState(false);
  const _authCode = "123456";


  //텍스트필드에 적힌 코드를 저장하는 변수
  const saveAuth = (event) => {
    setauthCode(event.target.value);
  };

  //옳바른 인증인지 확인하는 함수
  function authentication() {
    if (authCode === _authCode) {
      setisAuth(true);
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  }

  //체크를 한번 누르면 시간내에 못누르게 하는 함수
  function toggleCheck() {
    if (!isClickable) return;

    setIsChecked(true);
    setIsClickable(false);
    setTimer(60);
  }

  // 타이머
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

  //인증이 완료 되었나 확인
  const goCheck_PW = (event) => {
    if (isAuth) {
      setisNext(true);
    } else {
      alert("인증을 완료해 주세요.");
    }
  };

  // 취소시 로그인 페이지로
  function cancle() {
    movePage("/");
  }

  return (
    <div>
      <TopBar />
      {!isNext ? (
        <>
          (
          <div className="findId_bg">
            <div className="findId_main">
              <p className="findId_title">비밀번호 찾기</p>
              <hr />
              <p className="find_text">
                비밀번호를 찾기 위해서 이메일 인증을 진행해주세요
              </p>
              <div className="findpw_fname_sname">
                <input
                  type="text"
                  placeholder="성"
                  className="find_fname"
                ></input>
                <input
                  type="text"
                  placeholder="이름"
                  className="find_sname"
                ></input>
              </div>
              <input
                type="text"
                placeholder="아이디"
                className="findpw_id"
              ></input>

              <div className="find_email_top">
                <input
                  type="text"
                  placeholder="Email"
                  className="find_email"
                ></input>
                <button
                  className="find_send_email"
                  onClick={toggleCheck}
                  disabled={!isClickable}
                >
                  {isChecked ? "✔️" : "인증메일 전송"}
                </button>
              </div>
              <div className="find_authentication">
                <div style={{ position: "relative", width: "60%" }}>
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
              <button className="find_cancle" onClick={cancle}>
                취소
              </button>
              <button className="find_next_btn" onClick={goCheck_PW}>
                다음
              </button>
            </div>
          </div>
          )
        </>
      ) : (
        <Check_PW />
      )}
    </div>
  );
}
