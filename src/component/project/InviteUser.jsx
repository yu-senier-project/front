import React, { useState, useEffect } from "react";
import "../../styles/project/InviteUser.scss";
import { User } from "./User";
import { searchCompanyMember } from "../../apis/projectApis";

export const InviteUser = ({ setParticipants, participants, setManagerId }) => {
  const memberId = localStorage.getItem("memberId");

  // 회원 검색할때 텍스트
  const [searchValue, setSearchValue] = useState("");

  // 회원 검색 결과
  const [searchResult, setSearchResult] = useState([]);

  // 전체 삭제 버튼 눌렀을 떄
  const allDelete = () => {
    let newList = [];
    for (let i = 0; i < participants.length; i++) {
      for (let j = 0; j < searchResult.length; j++) {
        if (participants[i].memberId == searchResult[j].memberId) {
          break;
        }
      }
      newList = [
        ...newList,
        {
          memberId: participants[i].memberId,
          profile: participants[i].profile,
          nickname: participants[i].nickname,
        },
      ];
    }

    setSearchResult(newList);
    setParticipants([]);
  };

  // x 버튼 눌렀을 때
  const onClickDelete = (memberId, profile, nickname) => {
    const newParticipants = participants.filter(
      (user) => user.memberId != memberId
    );
    setParticipants(newParticipants);

    const newUser = { memberId, profile, nickname };
    for (let i = 0; i < searchResult.length; i++) {
      if (searchResult[i].memberId == memberId) {
        return;
      }
    }

    setSearchResult([...searchResult, newUser]);
  };

  // 플러스 버튼 눌렀을 때
  const onClickplus = (memberId, profile, nickname) => {
    //이미 참여자 리스트에 존재하는 회원일 경우 등록 막음

    for (let i = 0; i < participants.length; i++) {
      if (participants[i].memberId == memberId) {
        alert("이미 등록된 사용자입니다.");
        return;
      }
    }

    // 검색 결과에서 해당 유저 삭제
    const newSearchResult = searchResult.filter(
      (user) => user.memberId !== memberId
    );
    setSearchResult(newSearchResult);

    // 참여자 리스트에 추가
    const newUser = {
      memberId,
      profile,
      nickname,
    };

    setParticipants([...participants, newUser]);
  };

  // 회원 검색 결과 가져오기
  const fetchData = async () => {
    try {
      let data = await searchCompanyMember(searchValue, memberId);
      setSearchResult(
        data?.data.map((item) => ({
          memberId: item.memberId,
          nickname: item.nickname,
          profile: item.profile,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timeoutExecute = setTimeout(() => fetchData(), 300);
    return () => clearTimeout(timeoutExecute);
  }, [searchValue]);

  return (
    <div className="InviteUser">
      <div className="InviteUser-search">
        <input
          type="text"
          placeholder="회원 검색"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {searchResult?.map((user) => (
          <User
            imgHeight={45}
            imgWidht={50}
            width={170}
            button={"plus"}
            memberId={user.memberId}
            nickname={user.nickname}
            profile={user.profile}
            onClick={onClickplus}
          />
        ))}
      </div>
      <div className="InviteUser-list">
        <div className="InviteUser-list-title">
          <h5>참여자 : {participants.length}명 </h5>
          <h5 style={{ color: "red", cursor: "pointer" }} onClick={allDelete}>
            전체 삭제
          </h5>
        </div>
        <table>
          <tr>
            <th style={{ width: "75%" }}>사용자 이름</th>
            <th style={{ width: "25%" }}>대표자</th>
          </tr>
          {participants.map((user) => (
            <tr>
              <td>
                <User
                  imgHeight={40}
                  imgWidht={40}
                  width={100}
                  button={"close"}
                  memberId={user.memberId}
                  nickname={user.nickname}
                  profile={user.profile}
                  onClick={onClickDelete}
                />
              </td>
              <td className="td-radio">
                <input
                  type="radio"
                  name="king"
                  onChange={() => {
                    setManagerId(user.memberId);
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
