import { useState } from "react";
import "./App.css";
import Input from "./component/basic/Input";
import Button from "./component/basic/Button";

function App() {
  return (
    <>
      <div className="Div">
        <Input placeholder={"아이디"}></Input>
        <Input placeholder={"비밀번호"}></Input>
        <Button text={"로그인"}></Button>
        <Button text={"회원가입"}></Button>
      </div>
    </>
  );
}

export default App;
