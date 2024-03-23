import React, { useState, useEffect } from "react";
import "../css/find/Find.css";
import baseUrl from "../util/baseUrl";
import axios from "axios";
import Timer from "./Timer";
export default function Auth({ onChangeAuth, email }) {
  const [authCode, setAuthCode] = useState("");

  const saveAuth = (event) => {
    setAuthCode(event.target.value);
  };

  function authentication(email, authCode) {
    const postData = {
      email: email,
      authCode: authCode,
    };
    const url = `${baseUrl}/api/v1/email-auth/confirm`;
    axios
      .post(url, postData)
      .then(function (response) {
        //인증 성공시
        if (response.status === 200) {
          alert("인증 성공");
          onChangeAuth(true);
        }
      })
      .catch(function (error) {
        // 오류 발생시
        console.error("인증 실패:", error);
        if (error.response && error.response.status === 400) {
          alert("인증번호가 옳바르지 않습니다.");
        } else {
          alert("인증번호 처리 중 오류가 발생했습니다.");
        }
      });
  }
  return (
    <>
      {/* 인증 메일 전송 버튼 */}
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
            onClick={() => {
              authentication(email, authCode);
            }}
          >
            인증
          </button>
          <Timer />
        </div>
      </div>
    </>
  );
}
