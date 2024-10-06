import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../util/BaseUrl";
import { useNavigate } from "react-router-dom";
import Tobbar from "../../component/Topbar";
import Input from "../../component/basic/Input";
import Button from "../../component/basic/Button";
import useFindStore from "../../store/find/useFindStore";
import useTimer from "../../hooks/useTimer";
// import "../../styles/find/find.scss";

export default function PwInitCheckId() {
  const { minutes, seconds, isActive, toggle } = useTimer(5, 0); // 타이머 훅
  const [isChecked, setIsChecked] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    id: "",
    email: "",
    authCode: "",
  });
  const navigate = useNavigate();

  // inputHandler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkNameId = async () => {
    console.log(formData.firstName, formData.secondName, formData.id);
    if (
      formData.firstName === "" ||
      formData.secondName === "" ||
      formData.id === ""
    ) {
      alert("빈칸을 채워주세요.");
      return;
    }

    try {
      await checkAuthCode();
      const data = {
        firstName: formData.firstName,
        lastName: formData.secondName,
        nickname: formData.id,
        email: formData.email,
      };
      const response = await axios.post(
        "http://43.203.69.159/api/v1/auth/password-inquiry/verification",
        data
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/PasswordInit", { state: { email: formData.email } });
      } else {
        alert("유효하지 않은 사용자 정보입니다.");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        const { code } = error.response.data;
        if (code === 2001) {
          alert("사용자가 존재하지 않습니다.");
        } else if (code === 1013) {
          alert("사용자 정보가 다릅니다.");
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const sendAuthCode = async () => {
    if (formData.email === "") {
      alert("이메일을 작성해주세요");
      return;
    }
    setIsLoading(true); // 로딩 상태 시작
    try {
      const res = await axios.get(
        BaseUrl + "/api/v1/email-auth/request/" + formData.email
      );
      console.log(res);
      setIsSend(true);
      toggle(); // 타이머 시작
    } catch (err) {
      console.error("Error in sending email:", err);
      alert("이메일 전송에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const checkAuthCode = async () => {
    if (!isSend) {
      alert("이메일을 먼저 전송하세요.");
      throw new Error("이메일 전송 안됨");
    }
    const data = {
      email: formData.email,
      authCode: formData.authCode,
    };
    console.log(data);
    if (isActive) {
      try {
        const res = await axios.post(
          BaseUrl + `/api/v1/email-auth/confirm`,
          data
        );
        if (res.status === 200) {
          return true;
        } else {
          alert("유효하지 않은 인증번호");
          throw new Error("유효하지 않은 인증번호");
        }
      } catch (err) {
        console.error("Error in checking auth code:", err);
        alert("인증번호 확인에 실패했습니다.");
        throw err;
      }
    } else {
      alert("인증시간이 만료되었습니다.");
      throw new Error("인증시간 만료");
    }
  };

  return (
    <div className="find_container">
      <div className="init_likemodal">
        <Tobbar />
        <div className="init_section">
          <div className="init_section_text">
            <p>비밀번호 초기화</p>
            <p>아래 양식을 작성후 버튼을 클릭해 주세요.</p>
          </div>
          <div className="init_section__info">
            <Input
              placeholder={"성"}
              size={"Big"}
              name={"firstName"}
              value={formData.firstName}
              onChange={handleInputChange}
              id={"first_name"}
            />
            <Input
              placeholder={"이름"}
              size={"Big"}
              name={"secondName"}
              value={formData.secondName}
              onChange={handleInputChange}
              id={"second_name"}
            />
          </div>
          <div className="init_section__id">
            <Input
              placeholder={"아이디"}
              size={"Small"}
              name={"id"}
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="init_section__email">
            <Input
              placeholder={"이메일"}
              size={"Small"}
              name={"email"}
              value={formData.email}
              onChange={handleInputChange}
            />
            <button onClick={sendAuthCode} disabled={isActive || isLoading}>
              인증
            </button>
          </div>
          <div className="init_section__auth">
            <Input
              placeholder={"인증번호"}
              size={"Small"}
              name={"authCode"}
              value={formData.authCode}
              onChange={handleInputChange}
            />
            {isActive ? (
              <span className="auth_time">{`${minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}</span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <div className="init_section_action">
          <Button size={"Small"} text={"다음"} onClick={checkNameId} />
        </div>
      </div>
    </div>
  );
}
