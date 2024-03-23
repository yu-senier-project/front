import { useState } from "react";
import baseUrl from "../util/baseUrl";
import axios from "axios";
import "../css/find/Find.css";

export default function SendEmail({ onChangeEmail, onChangeTimer, email }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const saveEmail = (event) => {
    onChangeEmail(event.target.value);
    // console.log(email);
  };
  function sendEmail() {
    if (!isClickable) return;
    setIsChecked(true);
    setIsClickable(false);
    onChangeTimer(60);

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
            sendEmail(email);
          }}
          disabled={!isClickable}
        >
          {isChecked ? "✔️" : "인증메일 전송"}
        </button>
      </div>
    </>
  );
}
