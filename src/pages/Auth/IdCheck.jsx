import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFindStore from "../../store/find/useFindStore";
import Tobbar from "../../component/Topbar";
import "../../styles/find/find.scss"
export default function IdCheck() {
  const { checkId } = useFindStore();
  const navigate = useNavigate();
  return (
    <div>
      <Tobbar/>
      <div className="check_container">
      <h1>아이디 찾기</h1>
      <h2>입력하신 정보와 일치하는 아이디는 아래와 같습니다</h2>
      <b className="check_id">{checkId?{checkId}:'해당하는 아이디가 없습니다'}</b>
      <Link className="findpassword_button">비밀번호 찾기</Link>
      <Link className="login_button" to={"/"}>로그인 페이지로 가기</Link>
      </div>
    </div>
  );
}
