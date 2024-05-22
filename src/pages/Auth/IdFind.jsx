// IdFind.js
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../util/BaseUrl";
import { useNavigate } from "react-router-dom";
import Tobbar from "../../component/Topbar";
import Input from "../../component/basic/Input";
import Button from "../../component/basic/Button";
import useTimer from "../../hooks/useTimer";
import useFindStore from "../../store/find/useFindStore";
import "../../styles/find/find.scss";

export default function IdFind() {
  const { minutes, seconds, isActive, toggle } = useTimer(5, 0); // 타이머 훅
  const { setCheckId } = useFindStore();
  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    authCode: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendAuthCode = () => {
    if (formData.email === "") {
      alert("이메일을 작성해주세요");
      return;
    }
    toggle();
    axios
      .get(BaseUrl + "/api/v1/email-auth/request/" + formData.email)
      .then((res) => {
        console.log(res);
        setIsSend(true);
      })
      .catch((err) => {
        console.error("Error in sending email:", err);
        alert("이메일 전송에 실패했습니다.");
      });
  };

  const checkAuthCode = async () => {
    if (!isSend) {
      alert("이메일을 먼저 전송하세요.");
      return;
    }
    const data = {
      email: formData.email,
      authCode: formData.authCode,
    };
    console.log(data);
    if (isActive) {
      try {
        const res = await axios.post(BaseUrl + `/api/v1/email-auth/confirm`, data);
        if (res.status === 200) {
          await setCheckId(data.email);
          navigate("/CheckId");
        } else {
          alert("유효하지 않은 인증번호");
        }
      } catch (err) {
        console.error("Error in checking auth code:", err);
        alert("인증번호 확인에 실패했습니다.");
      }
    } else {
      alert("인증시간이 만료되었습니다.");
    }
  };

  return (
    <div id="idfind_container">
      <Tobbar />
      <div id="find_content">
        <h1>아이디 찾기</h1>
        <h2>이메일을 작성 후 인증 버튼을 클릭해 주세요.</h2>
        <div className="email_input">
          <Input
            placeholder={"이메일"}
            size={"Small"}
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
          />
          <button className="auth_button" onClick={sendAuthCode} disabled={isSend}>
            인증
          </button>
        </div>
        <div className="authcode_input">
          <Input
            placeholder={"인증번호"}
            size={"Small"}
            name={"authCode"}
            value={formData.authCode}
            onChange={handleInputChange}
          />
          {isActive ? (
            <span className="auth_time">{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
          ) : (
            <></>
          )}
        </div>
        <Button size={"Small"} text={"아이디 찾기"} onClick={checkAuthCode} />
      </div>
    </div>
  );
}
