import RegisterCompanySearch from "../../components/register/RegisterCompanySearch";
import RegisterMain from "../../components/register/RegisterMain";
import RegisterCompanyPositionSearch from "../../components/register/RegisterCompanyPositionSearch";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrophy } from "@fortawesome/free-solid-svg-icons";
import "../../css/register/Register.css";
export default function Register({ setRegisterCheck }) {
  let [checked, setChecked] = useState(null); //

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [position, setPositon] = useState("");

  let [회원가입단계, 회원가입단계변경] = useState(0);
  function backStage() {
    if (회원가입단계 == 1) {
      회원가입단계변경(0);
    } else if (회원가입단계 == 2) {
      회원가입단계변경(1);
    }
  }

  return (
    <div className="register-modal-wrap">
      <div className="register-modal-whiteBox">
        {/* 닫기버튼 */}
        <button
          className="register-modal-close"
          title="닫기"
          onClick={() => {
            setRegisterCheck(false);
          }}
        >
          X
        </button>

        {/* 뒤로가기 버튼 */}
        {회원가입단계 === 1 || 회원가입단계 === 2 ? (
          <button
            className="register-modal-back"
            onClick={() => {
              setCompanyName("");
              setCompanyEmail("");
              setChecked(null);
              backStage();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        ) : null}

        <h2 style={{ marginBottom: "5px" }}>가입하기</h2>
        <p className="register-modal-companyName">
          {회원가입단계 == 2 && companyName != ""
            ? `회사:${companyName}`
            : null}
        </p>

        {회원가입단계 == 0 ? (
          <RegisterCompanySearch
            checked={checked}
            setChecked={setChecked}
            회원가입단계변경={회원가입단계변경}
            setCompanyName={setCompanyName}
            companyName={companyName}
            setCompanyEmail={setCompanyEmail}
          />
        ) : null}
        {회원가입단계 == 1 ? (
          <RegisterCompanyPositionSearch
            setPositon={setPositon}
            회원가입단계변경={회원가입단계변경}
          />
        ) : null}
        {회원가입단계 == 2 ? (
          <RegisterMain
            companyName={companyName}
            companyEmail={companyEmail}
            position={position}
          />
        ) : null}
      </div>
    </div>
  );
}
