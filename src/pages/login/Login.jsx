import { useNavigate } from "react-router-dom";
import "../../css/login/Login.css";
import { useState, useRef } from "react";
import Register from "../Register";
import baseUrl from "../../util/baseUrl";
import axios from "axios";

export default function Login() {
  const [username, setId] = useState("");
  const [password, setPw] = useState("");
  const [registerCheck, setRegisterCheck] = useState(false);

  const saveId = (event) => {
    setId(event.target.value);
    // console.log(username);
  };
  const savePw = (event) => {
    setPw(event.target.value);
    // console.log(password);
  };

  const id_Pw_List = [
    { id: "user1", pw: "user1" },
    { id: "user2", pw: "user2" },
    { id: "user3", pw: "user3" },
  ];

  function check_Id_PW(id, pw) {
    const postData = {
      username: id,
      password: pw,
    };
    const url = `${baseUrl}/api/v1/auth/login`;
    axios
      .post(url, postData)
      .then(function (response) {
        //로그인 성공시
        if (response.status === 200) {
          alert("로그인 성공");
        }
      })
      .catch(function (error) {
        // 오류 발생시
        console.error("로그인 실패:", error);
        if (error.response && error.response.status === 400) {
          alert("로그인 정보가 올바르지 않습니다.");
        } else {
          alert("로그인 처리 중 오류가 발생했습니다.");
        }
      });
  }

  const movePage = useNavigate();

  function goFind_Id() {
    movePage("/user/FindId");
  }
  function goFind_Pw() {
    movePage("/user/FindPw");
  }
  return (
    <div className="login">
      {registerCheck ? <Register setRegisterCheck={setRegisterCheck} /> : null}
      <div className="Logo"></div>
      <div className="login_box">
        <input
          type="text"
          placeholder="아이디"
          className="login_id"
          onChange={saveId}
        ></input>

        <input
          type="text"
          placeholder="비밀번호"
          className="login_pw"
          onChange={savePw}
        ></input>

        <button
          className="login_btn"
          onClick={() => {
            check_Id_PW(username, password);
          }}
        >
          로그인
        </button>
        <button
          className="registration"
          onClick={() => {
            setRegisterCheck(true);
          }}
        >
          회원가입
        </button>
        <div className="login_find">
          <button className="login_find_id" onClick={goFind_Id}>
            아이디 찾기
          </button>
          <button className="login_find_pw" onClick={goFind_Pw}>
            비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
