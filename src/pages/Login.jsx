import React, { useRef, useState } from "react";
import Button from "../component/basic/Button";
import Input from "../component/basic/Input";
import Registration from "../modal/Registration";
import "../styles/login.css";
import { login } from "../services/loginFunc";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const innerRef = useRef(null);
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [register, setRegister] = useState(false);
  // 로그인 컨테이너 아무데나 클릭시 아이디로 포커싱
  const handleLoginRef = (event) => {
    if (event.currentTarget === event.target && innerRef.current) {
      innerRef.current.focus();
    }
  };
  // 회원가입 모달창에서 바깥 영역 클릭시 모달 종료
  const handleRegisterRef = (event) => {
    // console.log(event.target);
    // console.log(modalRef.current);
    if (event.target === modalRef.current) {
      setRegister(false);
    }
  };

  // 로그인 함수
  const handleLogin = () => {
    // console.log("@@");
    login(formData.id, formData.password);
  };

  // Input 상태 관리
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(formData);
  };

  //네비게이트 함수
  const navigate = useNavigate();

  function goToIdFind() {
    navigate("/Id");
  }
  function goToPasswordFind() {
    navigate("/Password");
  }

  return (
    <div id="login_container" onClick={handleLoginRef}>
      {register && <Registration ref={modalRef} onClick={handleRegisterRef} />}
      <Input
        name="id"
        value={formData.id}
        placeholder={"아이디"}
        id={"id"}
        ref={innerRef}
        onChange={handleInputChange}
      ></Input>
      <Input
        name="password"
        value={formData.password}
        placeholder={"비밀번호"}
        onChange={handleInputChange}
        type={"password"}
      ></Input>
      <Button text={"로그인"} onCilck={handleLogin}></Button>
      <Button
        text={"회원가입"}
        color={"registration"}
        onCilck={() => {
          setRegister(!register);
        }}
      ></Button>
      <div style={{ width: "50%" }}>
        <Button size={"text"} text={"아이디 찾기"} onCilck={goToIdFind} />
        <Button
          size={"text"}
          text={"비밀번호 찾기"}
          onCilck={goToPasswordFind}
        />
      </div>
    </div>
  );
}
