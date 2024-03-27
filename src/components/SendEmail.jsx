import { useState } from "react";
import baseUrl from "../util/baseUrl";
import axios from "axios";
import "../css/find/Find.css";

export default function SendEmail({ onChangeEmail, email, startTimer, timer }) {
  const saveEmail = (event) => {
    onChangeEmail(event.target.value);
  };
  function sendEmail() {
    startTimer();
    const url = `${baseUrl}/api/v1/email-auth/request/${email}`;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          alert("이메일 보내기");
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  return (
    <>
      <div className="find_email_top">
        <input
          type="text"
          placeholder="Email"
          className="find_email"
          onChange={saveEmail}
        ></input>

        <button
          className="find_send_email"
          onClick={() => {
            console.log(timer);
            sendEmail(email);
          }}
          disabled={timer !== 0} // 타이머 상태에 따른 조건 추가
        >
          {timer === 0 ? "인증메일 전송" : "✔️"}
        </button>
      </div>
    </>
  );
}
