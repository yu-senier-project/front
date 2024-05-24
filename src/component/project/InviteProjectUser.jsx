import React, { useEffect, useState } from "react";
import { User } from "./User";
import "../../styles/project/InviteUser.scss";
import { useGetParticipant } from "../../react-query/useProject";
import useProjectStore from "../../store/project/useProjectStore";

export const InviteProjectUser = ({ setParticipantList, participantList }) => {
  const { projectId } = useProjectStore();
  const { data, isLoading } = useGetParticipant(projectId);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (data) {
      let list = data?.data.filter((user) => {
        return !participantList.some(
          (participant) => participant.nickname === user.nickname
        );
      });
      setUserList(list);
    }
  }, [data]);

  // 사용자 추가
  const onClickplus = (memberId, nickname, profile) => {
    const newArr = userList.filter((user) => user.memberId != memberId);

    setUserList(newArr);

    setParticipantList([
      ...participantList,
      {
        memberId,
        nickname,
        profile,
      },
    ]);
  };

  // 사용자 삭제
  const onClickDelete = (memberId, nickname, profile) => {
    const newArr = participantList.filter((user) => user.memberId != memberId);

    setParticipantList(newArr);

    setUserList([
      ...userList,
      {
        memberId,
        nickname,
        profile,
      },
    ]);
  };

  // 전체 삭제
  const allDelete = () => {
    setUserList([...userList, ...participantList]);
    setParticipantList([]);
  };

  return (
    <div className="InviteUser">
      <div className="InviteUser-search">
        {userList?.map((user) => (
          <User
            imgHeight={40}
            imgWidht={50}
            width={170}
            button={"plus"}
            memberId={user.memberId}
            nickname={user.nickname}
            profile={user.profile}
            onClick={() => {
              onClickplus(user.memberId, user.nickname, user.profile);
            }}
          />
        ))}
      </div>
      <div className="InviteUser-list">
        <div className="InviteUser-list-title">
          <h5>참여자 : {participantList.length}명 </h5>
          <h5 style={{ color: "red", cursor: "pointer" }} onClick={allDelete}>
            전체 삭제
          </h5>
        </div>
        <table>
          <tr>
            <th style={{ width: "75%" }}>사용자 이름</th>
          </tr>
          {participantList?.map((user) => (
            <tr>
              <td>
                <User
                  imgHeight={40}
                  imgWidht={40}
                  width={160}
                  button={"close"}
                  memberId={user.memberId}
                  nickname={user.nickname}
                  profile={user.profile}
                  onClick={() => {
                    onClickDelete(user.memberId, user.nickname, user.profile);
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
