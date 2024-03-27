import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/find/Find.css";
import TopBar from "../../components/TopBar";
import Check_ID from "../../components/CheckID";
import Auth from "../../components/Auth";
import SendEmail from "../../components/SendEmail";
import Timer from "../../components/Timer";

export default function FindId() {
  const navigate = useNavigate();
  const [isAuth, setisAuth] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [email, setEmail] = useState();

  const handleChangeEmail = (newState) => {
    setEmail(newState);
  };

  const startTimer = () => {
    setTimer(5);
    setIsRunning(true);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0) {
      setIsRunning(false);
    }
  }, [timer]);

  const handleChangeAuth = (newState) => {
    setisAuth(newState);
  };

  const goCheck_ID = (event) => {
    if (isAuth) {
      setIsNext(true);
    } else {
      alert("인증을 완료해 주세요.");
    }
  };

  const goFind_PW = (event) => {
    navigate("/user/FindPW");
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

            <SendEmail
              startTimer={startTimer}
              onChangeEmail={handleChangeEmail}
              email={email}
              timer={timer}
            />
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <Auth onChangeAuth={handleChangeAuth} email={email} />
              <Timer timer={timer}></Timer>
            </div>
            <button className="find_next_btn" onClick={goCheck_ID}>
              아이디 찾기
            </button>
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
