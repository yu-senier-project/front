import React, { useState, useRef, useEffect } from "react";
import "../../styles/project/TodoPlusUser.scss";
import { useGetProjectParticipants } from "../../react-query/useProject";
import { User } from "./User";

export const TodoPlusUser = ({ projectId, setOnPlusUser }) => {
  // 내 아이디 가져오기
  const myId = localStorage.getItem("memberId");

  // 사용자가 설정한 유저 정보 가져오기
  const selectUsers = JSON.parse(localStorage.getItem("selectUsers"));

  // 참여자 정보 가져오기
  const { data, isLoading } = useGetProjectParticipants(projectId);

  // 프로젝트 참여자 리스트 저장
  const [users, setUsers] = useState([]);
  // 선택된 유저 ID 저장
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data.memberList || []);
    }
  }, [data]);

  const backgroundRef = useRef(null);
  const backgroundClick = (e) => {
    if (e.target === backgroundRef.current) {
      setOnPlusUser(false);
    }
  };

  // 완료 버튼 클릭 핸들러
  const onPlus = () => {
    // 체크된 체크박스의 ID만 selectedUsers에 추가
    const checkedUsers = Array.from(
      document.querySelectorAll(".td-radio input:checked")
    ).map((input) => input.id);

    localStorage.setItem("selectUsers", JSON.stringify(checkedUsers));
    setOnPlusUser(false);
    // console.log("Selected users:", checkedUsers);
  };

  return (
    <div className="TodoPlusUser" ref={backgroundRef} onClick={backgroundClick}>
      <div className="TodoPlusUser-wrap">
        <div className="Participants-user">
          <div className="Participants-user-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "70%" }}>사용자 이름</th>
                  <th style={{ width: "30%" }}>보기</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  if (user.memberId == myId) {
                    return null;
                  } else {
                    return (
                      <tr key={user.memberId}>
                        <td>
                          <User
                            imgHeight={40}
                            imgWidht={40}
                            width={100}
                            button={"none"}
                            nickname={user.nickname}
                            profile={user.profile}
                          />
                        </td>
                        <td className="td-radio">
                          <input
                            id={user.nickname}
                            type="checkbox"
                            name="king"
                            defaultChecked={selectUsers?.includes(
                              user.nickname
                            )}
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="Participants-btn">
          <div>
            <button
              style={{ backgroundColor: "#CE7171" }}
              onClick={() => setOnPlusUser(false)}
            >
              취소
            </button>
          </div>
          <div>
            <button style={{ backgroundColor: "#71c9ce" }} onClick={onPlus}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
