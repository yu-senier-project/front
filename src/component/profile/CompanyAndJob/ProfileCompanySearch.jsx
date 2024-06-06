import React, { useEffect, useRef, useState } from "react";
import "../../../styles/profile/CompanyJob/ProfileCompanySearch.scss";
import CloseButton from "../../basic/CloseButton";
import {
  getCompany,
  getCompanyEmail,
  getEmail,
  postEmailAuthNum,
} from "../../../apis/profileApis";
import useTimer from "../../../hooks/useTimer";

export const ProfileCompanySearch = ({
  setOnCompanyChange,
  setCompany,
  nowCompany,
}) => {
  // 타이머 훅 사용
  const { minutes, seconds, isActive, toggle } = useTimer(5, 0);

  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  // 검색 결과 저장
  const [companyName, setCompanyName] = useState(null);

  // 선택한 회사 이름
  const [selectValue, setSelectValue] = useState("");

  // 단계 저장
  const [stage, setStage] = useState(1);

  // 회사 이메일 저장
  const [email, setEmail] = useState("");

  // 회사 없을 일때 이메일 주소 입력 받음
  const [emailArr, setEmailArr] = useState("");

  // 사용자 입력 이메일 저장
  const [inputEmail, setInputEmail] = useState("");

  // 인증번호 저장
  const [authNum, setAuthNum] = useState("");

  // 이메일 인증 완료했는지
  const [finish, setFinish] = useState(false);

  // 이메일 인증 버튼 눌렀는지
  const [onAuth, setOnAuth] = useState(false);

  // 이메일 전송 버튼 눌렀을 때
  const onSubmit = async () => {
    if (inputEmail.length < 5) {
      alert("올바른 이메일을 입력하세요");
      return;
    }

    if (selectValue == "없음" && emailArr.length < 5) {
      alert("올바른 이메일을 입력하세요");
    }
    if (selectValue == "없음") {
      toggle();
      setOnAuth(true);
      const data = await getEmail(`${inputEmail}@${emailArr}`);
      return;
    }

    toggle();
    setOnAuth(true);
    const data = await getEmail(`${inputEmail}@${email}`);
  };

  // 인증 버튼 눌렀을 때
  const clickAuth = async () => {
    if (authNum == "") {
      alert("인증번호를 입력하세요");
      return;
    }
    const data = {
      email: `${inputEmail}@${email}`,
      authCode: authNum,
    };

    const res = await postEmailAuthNum(data);
    if (res.status == 200) {
      alert("인증 성공");
      setFinish(true);
      toggle();
    } else {
      alert("인증번호가 일치하지 않습니다");
    }
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") {
      onSubmit();
    }
  };

  const onAuthKeyDown = (e) => {
    if (e.key == "Enter") {
      clickAuth();
    }
  };

  //  회사 검색 결과 가져오는 함수
  const fetchData = async () => {
    const data = await getCompany(search);
    if (data.data == "") {
      setCompanyName([]);
    } else {
      setCompanyName(data.data);
    }

    return "ff";
  };

  // 회사 선택 버튼 눌렀을 떄
  const onSelect = (name) => {
    if (nowCompany == name) {
      alert("이미 소속된 회사입니다");
      return;
    }
    setSelectValue(name);
  };

  // 다음 버튼 눌렀을 때
  const onNext = async () => {
    if (selectValue == "") {
      alert("회사를 선택하세요.");
      return;
    }

    setStage(2);

    const data = await getCompanyEmail(selectValue);
    setEmail(data.data.email);
  };

  const onFinish = () => {
    if (!finish) {
      alert("이메일 인증을 완료해주세요");
      return;
    }
    setCompany(selectValue);
    setOnCompanyChange(false);
  };

  useEffect(() => {
    const timeoutExecute = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeoutExecute);
  }, [search]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="ProfileCompanySearch">
      <div className="ProfileCompanySearch-wrap">
        <div className="ProfileCompanySearch-close">
          <CloseButton
            size={15}
            onCloseButton={() => {
              setOnCompanyChange(false);
            }}
          />
        </div>
        {stage == 1 ? (
          <>
            <h4>회사 검색</h4>
            <div className="ProfileCompanySearch-input">
              <input
                ref={inputRef}
                type="text"
                placeholder="회사 검색"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="ProfileCompanySearch-result">
              {companyName?.map((companyName) => (
                <CompanyResult
                  onSelect={onSelect}
                  name={companyName.name}
                  selectValue={selectValue}
                  key={companyName.name}
                />
              ))}
            </div>
            <div className="ProfileCompanySearch-next">
              <button onClick={onNext}>다음</button>
            </div>
          </>
        ) : (
          <div className="ProfileAuth">
            {selectValue == "없음" ? <h4>본인 인증</h4> : <h4>회사 인증</h4>}
            <div className="ProfileAuth-email">
              <input
                onKeyDown={onKeyDown}
                value={inputEmail}
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
                type="text"
                disabled={isActive || finish}
              />
              {selectValue == "없음" ? (
                <>
                  <span>@</span>
                  <input
                    type="text"
                    value={emailArr}
                    onChange={(e) => {
                      setEmailArr(e.target.value);
                    }}
                  />
                </>
              ) : (
                <span>{`@${email}`}</span>
              )}
              <button
                className="ProfileAuth-btn"
                disabled={isActive || finish}
                onClick={onSubmit}
              >
                전송
              </button>
            </div>
            <div>
              {isActive ? (
                <span
                  style={{ color: "red", marginRight: "10px" }}
                  className="auth_time"
                >{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
              ) : (
                <></>
              )}
              <input
                style={{ padding: "5px", outline: "none" }}
                type="number"
                value={authNum}
                onChange={(e) => {
                  setAuthNum(e.target.value);
                }}
                placeholder="인증번호"
                disabled={!isActive || finish}
                onKeyDown={onAuthKeyDown}
              />
              <button
                onClick={clickAuth}
                className="ProfileAuth-btn"
                disabled={!isActive || finish}
              >
                인증
              </button>
            </div>
            <div className="ProfileAuth-button">
              <div>
                <button
                  style={{
                    backgroundColor: "#CE7171",
                  }}
                  onClick={() => {
                    setAuthNum("");
                    setInputEmail("");
                    setStage(1);
                  }}
                >
                  돌아가기
                </button>
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: "#71c9ce",
                  }}
                  onClick={onFinish}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CompanyResult = ({ name, onSelect, selectValue }) => {
  return (
    <div
      className={`companyResult ${
        selectValue == name ? `companyResult-select` : null
      }`}
      key={name}
    >
      <div className="companyResult-company">{name}</div>
      <div className="companyResult-btn">
        <button
          onClick={() => {
            onSelect(name);
          }}
        >
          선택
        </button>
      </div>
    </div>
  );
};
