// login.jsx
import React, { useEffect, useState } from "react";
import Button from "../component/basic/Button";
import Input from "../component/basic/Input";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../util/auth";
import useLoginStore from "../store/login/useLoginStore";
import RegistrationModal from "../modal/RegistrationModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem("login")) {
    navigate("/Home");
  }

  // logout();
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

  // useEffect(() => {
  //   logout();
  // }, []);

  return (
    <div id="login_container">
      <h1>
        <i>CNS</i>
      </h1>
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
      <Button
        text={"회원가입"}
        color={"registration"}
        onClick={handleOpen}
      ></Button>
      <div style={{ width: "50%" }}>
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
    </div>
  );
}
