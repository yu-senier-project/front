// login.jsx
import React, { useState } from "react";
import Button from "../component/basic/Button";
import Input from "../component/basic/Input";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../util/auth";
import useLoginStore from "../store/login/useLoginStore";

export default function Login() {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const { setIsLogin } = useLoginStore((state) => state);
  const navigate = useNavigate();

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
      setIsLogin();
      navigate("/Home");
    } else {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div id="login_container">
      <Input
        name="id"
        value={formData.id}
        placeholder={"아이디"}
        id={"id"}
        onChange={handleInputChange}
      ></Input>
      <Input
        name="password"
        value={formData.password}
        placeholder={"비밀번호"}
        onChange={handleInputChange}
        type={"password"}
      ></Input>
      <Button text={"로그인"} onClick={handleLogin}></Button>
      <Button text={"회원가입"} color={"registration"}></Button>
      <div style={{ width: "50%" }}>
        <Button
          size={"text"}
          text={"아이디 찾기"}
          onClick={() => navigate("/Id")}
        />
        <Button
          size={"text"}
          text={"비밀번호 찾기"}
          onClick={() => navigate("/Password")}
        />
      </div>
    </div>
  );
}
