import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../css/register/RegisterCompanySearch.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterCompanySearch(props) {
  const nav = useNavigate();

  // 로딩중인지 확인하는 함수
  const [loading, setLoading] = useState(false);

  // 체크박스 하나만 선택하도록 하는 함수
  function checkOnlyOne(element) {
    props.setChecked(element.value);
    props.setCompanyName(element.value);
    const checkboxes = document.getElementsByName("checkbox");
    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
    element.checked = true;
  }

  function 회사체크확인함수() {
    // 회사 체크 했는지 확인하는 함수
    if (props.checked == null) {
      alert("회사를 선택해주세요!");
      return;
    } else {
      getCompanyEmail();
    }
  }

  // 회사 이메일 받아 오는 함수
  const getCompanyEmail = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `http://13.51.99.142:8080/api/v1/company/get-email/${props.companyName}`
      );
      props.setCompanyEmail(res.data.email);
      console.log(res);
      setLoading(false);
      props.회원가입단계변경(1);
    } catch (e) {
      console.log(e);
      alert("오류가 발생했습니다. 다시 시도해주세요");
      window.location.reload();
    }
  };

  // 회사 검색 결과 데이터 저장 state
  const [회사검색결과, 회사검색결과변경] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (input == "") {
      return;
    }
    getCompanyName();
  }, [input]);

  async function getCompanyName() {
    try {
      let res = await axios.get(
        "http://13.51.99.142:8080/api/v1/company/search",
        {
          params: {
            keyword: input,
          },
        }
      );
      console.log(res.data);
      if (Array.isArray(res.data)) {
        let companyName = res.data.map((item) => {
          return item.name;
        });
        회사검색결과변경(companyName);
      } else {
        회사검색결과변경([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      {/*회사명 검색창 부분 */}
      <div style={{ position: "relative" }}>
        <input
          className="register-modal-companySearch"
          type="text"
          placeholder="회사 검색 (소속된 회사가 없을 시 없음을 검색해주세요 )"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="register-modal-searchIcon"
        />
      </div>

      {/*회사명 검색 결과 부분 */}
      <div className="register-modal-searchResult">
        {회사검색결과.length != 0 ? (
          <>
            {회사검색결과.map((a, i) => (
              <div className="register-modal-searchResult-name">
                <div className="register-modal-searchResult-title">
                  <label for={`checkbox${i}`}>
                    <span>{a}</span>
                  </label>
                </div>
                <input
                  id={`checkbox${i}`}
                  type="checkbox"
                  className="register-modal-searchResult-checkbox"
                  name="checkbox"
                  value={a}
                  onClick={(e) => checkOnlyOne(e.target)}
                ></input>
              </div>
            ))}
          </>
        ) : (
          <p style={{ margin: "0px" }}>검색결과 없음</p>
        )}
      </div>

      {/* 직무 선택 부분으로 이동 */}
      <button className="register-modal-nextBtn" onClick={회사체크확인함수}>
        다음
      </button>
    </div>
  );
}
