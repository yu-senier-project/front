//개인 정보 선택
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Spin from "../../util/Spin";
import "../../css/register/RegisterMain.css";

export default function RegisterMain({ companyName, companyEmail, position }) {
  //email중복일때 포커스 할 useRef
  const emailFocus = useRef();

  //id 중복일때 포커스 할 useRef
  const idFocus = useRef();

  // firstName 포거스 할 useRef
  const firstNameFocus = useRef();

  // enter 입력 처리 함수
  const handleEnter = (e, func) => {
    if (e.key == "Enter") {
      func();
    }
  };

  //완료 버튼 눌렀을때 로딩중표현 state
  const [loading, setLoading] = useState(false);

  //아이디 중복체크 했는지 확인
  const [idDupCheck, setIdDupCheck] = useState(false);

  // 이메일 인증번호 저장 state
  const [emailAuthNum, setEmailAuthNum] = useState();

  // 아이디 중복 검사 중인지 확인
  const [idCheckLoading, setIdCheckLoading] = useState(false);

  //이메일 인증했는지 검사
  const [emailCheck, setEmailCheck] = useState(false);

  //이메일 인증버튼 눌렀는지
  const [emailAuth, setEmailAuth] = useState(false);

  // 해당 input이 한번이라도 클릭이 되었는지 확인하는 state
  const [focusArr, setFocusArr] = useState({
    firstName: 0,
    secondName: 0,
    id: 0,
    pwd: 0,
    pwdCheck: 0,
    email: 0,
    emailCheck: 0,
  });

  // 회원정보 저장 state
  const [회원정보, 회원정보변경] = useState({
    firstName: "",
    secondName: "",
    id: "",
    pwd: "",
    pwdCheck: "",
    email: `@${companyEmail}`,
    emailCheck: "",
  });

  // 생년월일 저장 state
  const [selectedDate, setSelectedDate] = useState({
    year: null,
    month: null,
    day: null,
  });

  //회원정보가 제대로 입력되었는지 확인하는 함수
  function checkInfoTrue() {
    let firstNameTrue = !회원정보["firstName"] == "";
    let secondNameTrue = !회원정보["secondName"] == "";
    let idTrue = !회원정보["id"].length <= 5 && idDupCheck;
    let pwdTrue = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/.test(
      회원정보["pwd"]
    );
    let pwdCheckTrue = !회원정보["pwdCheck"] != 회원정보["pwd"];
    let emaiTrue = /^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      회원정보["email"]
    );
    let birthTrue =
      selectedDate.year != null &&
      selectedDate.month != null &&
      selectedDate.day != null;

    let emailCheckTrue = emailCheck;
    if (
      firstNameTrue &&
      secondNameTrue &&
      idTrue &&
      pwdTrue &&
      pwdCheckTrue &&
      emaiTrue &&
      birthTrue &&
      emailCheckTrue
    ) {
      return true;
    } else {
      return false;
    }
  }

  //완료 버튼 눌렀을때
  function registerFinsh() {
    if (!idDupCheck) {
      alert("아이디 중복검사를 해주세요");
      return;
    }
    if (!emailCheck) {
      alert("이메일 인증을 완료해주세요");
      return;
    }
    if (!checkInfoTrue()) {
      alert("회원정보를 제대로 입력해주세요");
      return;
    }

    setLoading(true);

    const data = {
      firstName: 회원정보.firstName,
      lastName: 회원정보.secondName,
      username: 회원정보.id,
      password: 회원정보.pwd,
      email: 회원정보.email,
      position: position,
      companyName: companyName,
      birth: `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`,
    };
    axios
      .post(`http://13.51.99.142:8080/api/v1/auth/register`, { ...data })
      .then((res) => {
        setLoading(false);
        console.log(res);
        alert("회원가입 완료");
        window.location.reload();
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        setEmailCheck(false);
        setEmailAuth(false);
        setEmailAuthNum("");
        alert(e.response.data.message);
      });
  }

  // 아이디 중복 확인 체크하는 함수
  async function idDupCheckFunction() {
    if (회원정보.id.length < 6) {
      alert("아이디를 6글자 이상 입력해주세요");
      return;
    }
    if (idCheckLoading) {
      return;
    }
    setIdCheckLoading(true);
    try {
      let les = await axios.get(
        `http://13.51.99.142:8080/api/v1/auth/check-duplicate/${회원정보.id}`
      );
      setIdCheckLoading(false);
      if (!idDupCheck && !les.data.isExist) {
        setIdDupCheck(true);
      } else {
        alert("중복된 아이디 입니다. 다시 입력해주세요");
        idFocus.current.focus();
        changeInfo({ target: { value: "" } }, "id");
      }
    } catch (e) {
      console.log(e);
    }
  }

  //에러 메시지랑 테두리 변경할 경우 체크할 함수
  function checkError(name) {
    if (focusArr[name] == 1 && 회원정보[name] == "") {
      return true;
    } else {
      return false;
    }
  }

  //input창 변경시 state 변경함수
  function changeInfo(e, name) {
    let obj = { ...회원정보 };
    obj[name] = e.target.value;
    회원정보변경(obj);
  }

  //이메일 인증번호 일치하는지 확인하는 함수
  function checkAuthEmail() {
    const data = { email: 회원정보.email, authCode: emailAuthNum };
    axios
      .post(`http://13.51.99.142:8080/api/v1/email-auth/confirm`, data)
      .then((res) => {
        console.log(res);
        setEmailCheck(true);
      })
      .catch((e) => {
        alert("인증번호를 다시 입력해주세요");
        console.log(e);
      });
  }

  const input클릭확인 = (name) => {
    if (focusArr[name] == 0) {
      let obj = { ...focusArr };
      obj[name] = 1;
      setFocusArr(obj);
    }
  };

  const [triggerTimer, setTriggerTimer] = useState(false);

  // 인증버튼 재전송 함수
  const handleResend = () => {
    if (!회원정보.email.includes(companyEmail)) {
      alert("회사 이메일을 확인해주세요");
      return;
    }
    if (emailAuth) {
      return;
    }
    setEmailAuth(true);
    setTimer(180); // 타이머 초기값으로 재설정
    setTriggerTimer((prev) => !prev); // triggerTimer 값을 토글하여 useEffect를 다시 실행하도록 함
    timerfinish.current = 180; // useRef를 초기값으로 재설정

    //인증번호 전송
    axios
      .get(
        `http://13.51.99.142:8080/api/v1/email-auth/request/${회원정보.email}`
      )
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 타이머 시간 변수
  const [timer, setTimer] = useState(180);

  //처음 마운트될때 실행 안되게 하는 변수
  const [timerCheck, setTimerCheck] = useState(false);
  const timerfinish = useRef(180);

  // 타이머
  useEffect(() => {
    let timerInterval;
    if (!timerCheck) {
      setTimerCheck(true);
      return;
    }
    if (timer === 0) {
      setEmailAuth(false);
      clearInterval(timerInterval); // 타이머가 종료되면 clearInterval로 정리
      return;
    }

    timerInterval = setInterval(() => {
      timerfinish.current--;
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머를 정리
    return () => clearInterval(timerInterval);
  }, [triggerTimer, timer]);

  // 년도 선택 옵션 생성 (1900년부터 현재년도까지)
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1950; year <= currentYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  // 월 선택 옵션 생성 (1월부터 12월까지)
  const monthOptions = [];
  for (let month = 1; month <= 12; month++) {
    monthOptions.push(
      <option key={month} value={month}>
        {month}
      </option>
    );
  }

  // 일 선택 옵션 생성 (1일부터 31일까지)
  const dayOptions = [];
  for (let day = 1; day <= 31; day++) {
    dayOptions.push(
      <option key={day} value={day}>
        {day}
      </option>
    );
  }

  useEffect(() => {
    firstNameFocus.current.focus();
  }, []);

  if (loading) {
    return <div>회원가입 진행중...</div>;
  }

  return (
    <div className="registerMain">
      {/* 이름 입력 */}
      <div className="registerMain-name">
        <div className="registerMain-name-first">
          <input
            ref={firstNameFocus}
            value={회원정보["firstName"]}
            type="text"
            placeholder="성"
            onFocus={() => {
              input클릭확인("firstName");
            }}
            className={
              focusArr["firstName"] == 1 && 회원정보["firstName"] == ""
                ? "register-red"
                : focusArr["firstName"] == 1
                ? "register-blue"
                : null
            }
            onChange={(e) => {
              changeInfo(e, "firstName");
            }}
          />
          {/* input창 포커스되고 성 입력 안했을때  */}
          {checkError("firstName") ? <p>성을 입력해주세요</p> : null}
        </div>
        <div className="registerMain-name-second">
          <input
            value={회원정보["secondName"]}
            type="text"
            placeholder="이름"
            onFocus={() => {
              input클릭확인("secondName");
            }}
            onChange={(e) => {
              changeInfo(e, "secondName");
            }}
            className={
              focusArr["secondName"] == 1 && 회원정보["secondName"] == ""
                ? "register-red"
                : focusArr["secondName"] == 1
                ? "register-blue"
                : null
            }
          />
          {checkError("secondName") ? <p>이름을 입력해주세요</p> : null}
        </div>
      </div>
      <div style={{ clear: "both" }}></div>

      {/* 아이디 입력 */}
      <div className="registerMain-id">
        <input
          onKeyDown={(e) => {
            handleEnter(e, idDupCheckFunction);
          }}
          ref={idFocus}
          type="text"
          placeholder="아이디"
          value={회원정보["id"]}
          onChange={(e) => {
            changeInfo(e, "id");
          }}
          onFocus={() => {
            input클릭확인("id");
          }}
          className={
            focusArr["id"] == 1 && 회원정보["id"].length <= 5
              ? "register-red"
              : focusArr["id"] == 1 && 회원정보["id"].length >= 6
              ? "register-blue"
              : null
          }
        />
        <button
          className="registerMain-id-dupCheckBtn"
          onClick={() => {
            if (!idDupCheck) {
              idDupCheckFunction();
            }
          }}
          disabled={idCheckLoading || idDupCheck}
        >
          {idCheckLoading ? (
            <Spin />
          ) : idDupCheck ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="registerMain-id-dupCheckIcon"
            />
          ) : (
            <span>중복확인</span>
          )}
        </button>

        {focusArr["id"] == 1 && 회원정보["id"].length <= 5 ? (
          <p>6글자 이상 입력해주세요</p>
        ) : null}
      </div>

      {/* 비밀번호 입력 */}
      <div className="registerMain-pwd">
        <div className="registerMain-name-first register-pwd">
          <input
            value={회원정보["pwd"]}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => {
              changeInfo(e, "pwd");
            }}
            onFocus={() => {
              input클릭확인("pwd");
            }}
            className={
              focusArr["pwd"] === 1 &&
              !/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/.test(
                회원정보["pwd"]
              )
                ? "register-red"
                : focusArr["pwd"] === 1 &&
                  /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/.test(
                    회원정보["pwd"]
                  )
                ? "register-blue"
                : null
            }
          />
          {focusArr["pwd"] == 1 &&
          !/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/.test(
            회원정보["pwd"]
          ) ? (
            <p>특수문자, 대문자 포함 6글자 이상 입력해주세요</p>
          ) : null}
        </div>
        <div className="registerMain-name-second">
          <input
            value={회원정보["pwdCheck"]}
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => {
              changeInfo(e, "pwdCheck");
            }}
            onFocus={() => {
              input클릭확인("pwdCheck");
            }}
            className={
              focusArr["pwdCheck"] === 1 &&
              회원정보["pwdCheck"] != 회원정보["pwd"]
                ? "register-red"
                : focusArr["pwdCheck"] === 1 &&
                  회원정보["pwdCheck"] == 회원정보["pwd"]
                ? "register-blue"
                : null
            }
          />

          {focusArr["pwdCheck"] === 1 &&
          회원정보["pwdCheck"] != 회원정보["pwd"] ? (
            <p>비밀번호가 일치하지않습니다</p>
          ) : null}
        </div>
      </div>
      <div style={{ clear: "both" }}></div>

      {/* 이메일 입력 */}
      <div className="registerMain-email">
        <div style={{ height: "59px" }}>
          <input
            onKeyDown={(e) => {
              handleEnter(e, handleResend);
            }}
            ref={emailFocus}
            type="email"
            onChange={(e) => {
              changeInfo(e, "email");
            }}
            value={회원정보["email"]}
            onFocus={() => {
              input클릭확인("email");
            }}
            placeholder="이메일"
            className={
              focusArr["email"] === 1 &&
              !/^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                회원정보["email"]
              )
                ? "register-red"
                : focusArr["email"] === 1 &&
                  /^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                    회원정보["email"]
                  )
                ? "register-blue"
                : null
            }
          />
          <button
            className={`registerMain-email-authBtn ${
              !/^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                회원정보["email"]
              )
                ? "registerMain-email-authBtnNo"
                : null
            }`}
            onClick={() => {
              handleResend();
            }}
          >
            {emailCheck ? (
              <FontAwesomeIcon
                icon={faCheck}
                className="registerMain-id-dupCheckIcon"
              />
            ) : emailAuth ? (
              <Spin />
            ) : (
              <>인증</>
            )}
          </button>
          {focusArr["email"] === 1 &&
          !/^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
            회원정보["email"]
          ) ? (
            <p>올바른 이메일 주소를 입력해주세요</p>
          ) : null}
        </div>

        {/* 인증번호 확인 */}

        {/* 타이머 */}
        {emailAuth && !emailCheck ? (
          <p className="registerMain-emailCheck-timer">{`${Math.floor(
            timer / 60
          )}:${timer % 60}초`}</p>
        ) : null}
        {/* 인증번호창 */}
        <input
          onKeyDown={(e) => {
            handleEnter(e, checkAuthEmail);
          }}
          type="number"
          value={emailAuthNum}
          onChange={(e) => {
            setEmailAuthNum(e.target.value);
          }}
          placeholder="인증번호"
          className={`${emailCheck ? "register-blue" : null}`}
          disabled={emailAuth || emailCheck ? false : true}
        />
        <button
          className={`registerMain-emailCheck-btn ${
            emailAuth || emailCheck ? null : "none"
          }`}
          onClick={() => {
            checkAuthEmail();
          }}
        >
          {emailCheck ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="registerMain-id-dupCheckIcon"
            />
          ) : (
            "인증"
          )}
        </button>
      </div>

      {/* 생년월일 입력 */}
      <div className="registerMain-birthday">
        <div>
          {/* year */}
          <select
            className={`${selectedDate.year != null ? "register-blue" : null}`}
            value={selectedDate.year}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, year: e.target.value })
            }
          >
            <option value="" disabled hidden selected>
              년도 선택
            </option>
            {yearOptions}
          </select>
        </div>

        {/* month */}
        <div>
          <select
            className={`${selectedDate.month != null ? "register-blue" : null}`}
            value={selectedDate.month}
            onChange={(e) => {
              Number(e.target.value) < 10
                ? setSelectedDate({
                    ...selectedDate,
                    month: `0${e.target.value}`,
                  })
                : setSelectedDate({ ...selectedDate, month: e.target.value });
            }}
          >
            <option value="" disabled hidden selected>
              월 선택
            </option>
            {monthOptions}
          </select>
        </div>

        {/* day */}
        <div>
          <select
            value={selectedDate.day}
            onChange={(e) => {
              Number(e.target.value) < 10
                ? setSelectedDate({
                    ...selectedDate,
                    day: `0${e.target.value}`,
                  })
                : setSelectedDate({ ...selectedDate, day: e.target.value });
            }}
            className={`${selectedDate.day != null ? "register-blue" : null}`}
          >
            <option value="" disabled hidden selected>
              일 선택
            </option>
            {dayOptions}
          </select>
        </div>
      </div>

      <button
        className="registerMain-nextBtn"
        onClick={() => {
          registerFinsh();
        }}
      >
        완료
      </button>
    </div>
  );
}
