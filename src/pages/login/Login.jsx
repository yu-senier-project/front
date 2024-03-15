import { useNavigate } from "react-router-dom";
import "../../css/login/Login.css";
import { useState, useRef } from "react";
import Register from "../Register";

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
    let id_State = false;
    let pw_State = false;
    let state = 0; // 0 아이디 오류, 1 비밀번호 오류, 2 성공
    for (let i = 0; i < id_Pw_List.length; i++) {
      if (id_Pw_List[i].id === id) {
        id_State = true;
      }
      if (id_Pw_List[i].pw === pw) {
        pw_State = true;
        break;
      }
    }
    if (id_State && pw_State) {
      state = 2;
    } else if (id_State && !pw_State) {
      state = 1;
    } else if ((!id_State && pw_State) || (!id_State && !pw_State)) {
      state = 0;
    }

    return state;
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
            if (check_Id_PW(username, password) === 2) {
              alert("로그인 성공");
            } else if (check_Id_PW(username, password) === 0) {
              alert("아이디 오류");
            } else if (check_Id_PW(username, password) === 1) {
              alert("패스워드 오류");
            }
            console.log(check_Id_PW(username, password));
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
