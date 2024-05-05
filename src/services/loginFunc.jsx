import axios from "axios";
const baseUrl = "http://13.51.99.142:8080";
export function login(id, password) {
  console.log("@@");
  const data = {
    nickname: id,
    password: password,
  };
  axios.post(baseUrl + "/api/v1/auth/login", data).then((response) => {
    console.log(response);
    if (response.status == 200) {
      alert("성공");
    } else {
      alert("실패");
    }
  });
}
export function registration() {}
