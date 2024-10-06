import Tobbar from "../../component/Topbar";
import Input from "../../component/basic/Input";
import Button from "../../component/basic/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../styles/find/checkpassword.scss";

export default function PwInit() {
  const location = useLocation();
  const email = location.state.email;
  const [formData, setFormData] = useState({
    newPassword: "",
    newPasswordCheck: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInitPassword = () => {
    if (formData.newPassword !== formData.newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    } else {
      const data = {
        email: email,
        password: formData.newPassword,
      };
      axios
        .put("http://43.203.69.159/api/v1/auth/password-inquiry", data)
        .then((response) => {
          console.log(response.data);
          alert("비밀번호 변경이 완료되었습니다");
          navigate("/");
        });
    }
    console.log(formData, email);
  };
  return (
    <div className="find_container">
      <div className="init_likemodal">
        <Tobbar />
        <div className="init_check_section">
          <div className="init_check_text">
            <p>비밀번호 초기화</p>
            <p>아래 양식을 작성후 버튼을 클릭해 주세요.</p>
          </div>
          <div className="init_check_form">
            <Input
              size={"Small"}
              placeholder={"새 비밀번호"}
              name={"newPassword"}
              onChange={handleInputChange}
            />
            <Input
              size={"Small"}
              placeholder={"새 비밀번호 확인"}
              name={"newPasswordCheck"}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="init_check_action">
          <Button
            size={"Small"}
            text={"비밀번호 초기화"}
            onClick={handleInitPassword}
          />
          <button>
            <Link to={"/"}>로그인 페이지로 가기</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
