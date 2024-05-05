import React, { forwardRef } from "react";
import Input from "../component/basic/Input";
import Button from "../component/basic/Button";
import "../styles/login.css";

const Registration = forwardRef((props, ref) => {
  return (
    <div id="register_container" ref={ref} onClick={props.onClick}>
      <div id="register_content">
        <h1>가입하기</h1>
        <Input size={"Large"} />
      </div>
    </div>
  );
});

export default Registration;
