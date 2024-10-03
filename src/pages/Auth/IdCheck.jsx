import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFindStore from "../../store/find/useFindStore";
import Tobbar from "../../component/Topbar";
import "../../styles/find/find.scss";
export default function IdCheck() {
  const { checkId } = useFindStore();
  const navigate = useNavigate();
  return (
    <div className="find_container">
      <div className="find_likemodal">
        <Tobbar />
        <div className="check_section">
          <div className="check_section_text">
            <p>내 계정 찾기</p>
            <p>입력하신 정보와 일치하는 아이디는 아래와 같습니다</p>
          </div>
          <div className="check_section_main">
            {checkId ? (
              <p className="check_id">{checkId}</p>
            ) : (
              <p>해당하는 아이디가 없습니다</p>
            )}
          </div>
        </div>
        <div className="check_action">
          <button>
            <Link className="findpassword_button" to={"/Password"}>
              비밀번호 재설정
            </Link>
          </button>
          <button>
            <Link className="login_button" to={"/"}>
              로그인 페이지로 가기
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
