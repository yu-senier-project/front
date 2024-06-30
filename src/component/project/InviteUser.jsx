import React, { useState, useEffect } from "react";
import "../../styles/project/InviteUser.scss";
import { User } from "./User";
import { searchCompanyMember } from "../../apis/projectApis";

export const InviteUser = ({
  setParticipants,
  participants,
  setManagerId,
  managerId,
}) => {
  console.log(managerId);
  const memberId = localStorage.getItem("memberId");

  // 회원 검색할때 텍스트
  const [searchValue, setSearchValue] = useState("");

  // 회원 검색 결과
  const [searchResult, setSearchResult] = useState([]);

  // 전체 삭제 버튼 눌렀을 때
  const allDelete = () => {
    setSearchResult([...searchResult, ...participants]);
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
    if (participants.some((user) => user.memberId === memberId)) {
      alert("이미 등록된 사용자입니다.");
      return;
    }

    const newSearchResult = searchResult.filter(
      (user) => user.memberId !== memberId
    );
    setSearchResult(newSearchResult);

    const newUser = { memberId, profile, nickname };
    setParticipants([...participants, newUser]);
  };

  // 회원 검색 결과 가져오기
  const fetchData = async () => {
    try {
      const data = await searchCompanyMember(searchValue, memberId);
      setSearchResult(
        data?.data.map((item) => {
          return {
            memberId: item.memberId,
            nickname: item.nickname,
            profile: item.profile,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timeoutExecute = setTimeout(fetchData, 200);
    return () => clearTimeout(timeoutExecute);
  }, [searchValue]);

  return (
    <div className="InviteUser">
      <div className="InviteUser-search">
        <input
          type="text"
          placeholder="회원 검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchResult.map((user) => (
          <User
            key={user.memberId}
            imgHeight={45}
            imgWidht={50}
            width={170}
            button={"plus"}
            memberId={user.memberId}
            nickname={user.nickname}
            profile={user.profile}
            onClick={() =>
              onClickplus(user.memberId, user.profile, user.nickname)
            }
          />
        ))}
      </div>
      <div className="InviteUser-list">
        <div className="InviteUser-list-title">
          <h5>참여자 : {participants.length}명</h5>
          <h5 style={{ color: "red", cursor: "pointer" }} onClick={allDelete}>
            전체 삭제
          </h5>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "75%" }}>사용자 이름</th>
              <th style={{ width: "25%" }}>대표자</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((user) => (
              <tr key={user.memberId}>
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
                  {managerId !== undefined ? (
                    <input
                      type="radio"
                      name="king"
                      onChange={() => setManagerId(user.memberId)}
                      checked={
                        managerId !== undefined
                          ? managerId === user.memberId
                          : false
                      }
                    />
                  ) : (
                    <input
                      type="radio"
                      name="king"
                      onChange={() => setManagerId(user.memberId)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
