import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BaseUrl from "../util/BaseUrl";
import Tobbar from "../component/Topbar";
import Input from "../component/basic/Input";
import Button from "../component/basic/Button";
import useTimer from "../hooks/useTimer";
export default function IdFind() {
  const { minutes, seconds, isActive, toggle } = useTimer(5, 0); // 타이머 훅
  const [formData, setFormData] = useState({
    email: "",
    authCode: "",
  });
  const [check, setCheck] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(formData);
  };

  const sendAuthCode = () => {
    if (formData.email === "") {
      alert("이메일을 작성해주세요");
      return;
    }
    toggle();
    console.log(formData.email);
    axios
      .get(BaseUrl + `/api/v1/email-auth/request/${formData.email}`)
      .then((res) => {
        console.log(res.status);
      });
  };
  const checkAuthCode = () => {
    const data = {
      email: formData.email,
      authCode: formData.authCode,
    };
    console.log(data);
    if (isActive) {
      axios.post(BaseUrl + `/api/v1/email-auth/confirm`, data).then((res) => {
        if (res.status === 200) {
          alert("!!");
          setCheck(true);
        } else {
          alert("--");
        }
      });
    } else {
      alert("timeover");
    }
  };

  return (
    <div id="idfind_container">
      <Tobbar />
      <div id="find_content">
        <h1>아이디 찾기</h1>
        <h2>이메일을 작성후 인증 버튼을 클릭해 주세요.</h2>
        <div style={{ width: "100%" }}>
          <Input
            placeholder={"이메일"}
            size={"Small"}
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
          />
          <button
            id="auth_button"
            onClick={sendAuthCode}
            disabled={isActive ? true : false}
          >
            인증
          </button>
        </div>
        <div style={{ width: "100%" }}>
          <Input
            placeholder={"인증번호"}
            size={"Small"}
            name={"authCode"}
            value={formData.authCode}
            onChange={handleInputChange}
          />
          <span style={{ position: "absolute" }}>{`${minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`}</span>
        </div>
        <Button size={"Small"} text={"아이디 찾기"} onCilck={checkAuthCode} />
      </div>
    </div>
  );
}
