// login.jsx
import React, { useEffect, useState } from "react";
import Button from "../component/basic/Button";
import Input from "../component/basic/Input";
import "../styles/login.scss";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../util/auth";
import useLoginStore from "../store/login/useLoginStore";
import RegistrationModal from "../modal/RegistrationModal";

export default function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem("login")) {
    navigate("/Home");
  }

  const [formData, setFormData] = useState({ id: "", password: "" });
  const { setIsLogin } = useLoginStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async () => {
    const data = {
      nickname: formData.id,
      password: formData.password,
    };
    const success = await login(data);
    if (success) {
      localStorage.setItem("login", true);
      setIsLogin();
      navigate("/Home");
    } else {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onEnterClick = (e) => {
    if (e.key == "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login_container">
      <div className="login_col">
        <img src="../../public/image/임시로고.jpg" alt="임시로고" />
      </div>

      <div className="login_col">
        <div className="login__header">
          <p>대충 아무거나 적었음</p>
        </div>
        <div className="login__section">
          <p>뭐라 적어야할까.</p>
          <div className="login__section_form">
            <RegistrationModal open={open} handleClose={handleClose} />
            <Input
              name="id"
              value={formData.id}
              placeholder={"아이디"}
              id={"id"}
              onChange={handleInputChange}
            ></Input>
            <Input
              onkeydown={onEnterClick}
              name="password"
              value={formData.password}
              placeholder={"비밀번호"}
              onChange={handleInputChange}
              type={"password"}
            ></Input>
            <Button text={"로그인"} onClick={handleLogin}></Button>
          </div>
        </div>
        <div className="login__footer">
          <div className="login__footer_find">
            <p>로그인에 문제가 있나요?</p>
            <Button
              size={"text"}
              text={"아이디 찾기"}
              onClick={() => navigate("/Id")}
            />
            <Button
              size={"text"}
              text={"비밀번호 초기화"}
              onClick={() => navigate("/Password")}
            />
          </div>
          <div className="login__footer_register">
            <p>지금 가입하세요.</p>
            <Button
              text={"회원가입"}
              color={"registration"}
              onClick={handleOpen}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
