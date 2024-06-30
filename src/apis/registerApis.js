import axios from "axios";
import { BaseUrl } from "../util/BaseUrl";

export const checkAuthCode = async (
  formData,
  isDuplicate,
  isSend,
  isActive,
  companyEmail
) => {
  if (!isDuplicate) {
    alert("ID 중복확인을 진행해 주세요");
    return { statusCode: 400 };
  }

  if (!isSend) {
    alert("이메일을 먼저 전송하세요.");
    return { statusCode: 400 };
  }

  const data = {
    email: formData.email + "@" + companyEmail,
    authCode: formData.authCode,
  };
  console.log(data);
  if (isActive) {
    try {
      const res = await axios.post(
        `${BaseUrl}/api/v1/email-auth/confirm`,
        data
      );
      return { statusCode: res.status, data: res.data };
    } catch (err) {
      alert("인증번호 확인에 실패했습니다.");
      return { statusCode: 400, error: err };
    }
  } else {
    alert("인증시간이 만료되었습니다.");
    return { statusCode: 400 };
  }
};

export const sendAuthCode = async (formData, companyEmail, toggle) => {
  if (formData.email === "") {
    alert("이메일을 작성해주세요");
    return;
  }
  toggle();
  try {
    const res = await axios.get(
      `${BaseUrl}/api/v1/email-auth/request/${formData.email}@${companyEmail}`
    );
    
    return { statusCode: res.status, data: res.data };
  } catch (err) {
    alert("이메일 전송에 실패했습니다.");
    return { statusCode: 400, error: err };
  }
};

export const getCompanyEmail = async (
  companyName,
  setCompanyEmail,
  setSelectedCompany
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/api/v1/company/${companyName}/email`
    );
    setCompanyEmail(response.data.email);
    setSelectedCompany(companyName);
  } catch (error) {
    alert("회사 이메일을 가져오는데 실패했습니다.");
  }
};
