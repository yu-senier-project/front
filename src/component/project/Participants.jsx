import React, { useState, useEffect, useRef } from "react";
import "../../styles/project/Participants.scss";
import useProjectStore from "../../store/project/useProjectStore";
import { useGetProjectParticipants } from "../../react-query/useProject";
import { Loading } from "../basic/Loading";
import { User } from "./User";
import { useNavigate } from "react-router-dom";

export const Participants = ({ setOnParticipants }) => {
  const myId = localStorage.getItem("memberId");
  const { projectId } = useProjectStore();
  const nav = useNavigate();

  const backgroundRef = useRef(null);
  const backgroundClick = (e) => {
    if (e.target == backgroundRef.current) {
      setOnParticipants(false);
    }
  };

  // 현재 참여자 정보 가져오기
  const { data, isLoading } = useGetProjectParticipants(projectId);

  // 참여자 리스트
  const [participants, setParticipants] = useState([]);

  // 매니저 아이디 저장
  const [managerId, setManagerId] = useState(0);

  // 돌아가기 버튼 눌렀을 때
  const onBackClick = () => {
    setOnParticipants(false);
  };

  // 수정하기 버튼 눌렀을 때
  const onUpdateClick = () => {
    if (myId != managerId) {
      alert("프로젝트 담당자만 수정할 수 있습니다.");
      return;
    }
    nav("/ProjectHome/ParticipantsUpdate");
  };

  useEffect(() => {
    if (data && data.data) {
      setParticipants(data.data.memberList || []);
      setManagerId(data.data.managerId);
    }
  }, [data]);

  if (isLoading) {
    return <Loading text="정보 가져오는중..."></Loading>;
  }

  return (
    <div className="Participants" ref={backgroundRef} onClick={backgroundClick}>
      <div className="Participants-wrap">
        <div className="Participants-user">
          <div className="Participants-user-table">
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
                        button={"none"}
                        memberId={user.memberId}
                        nickname={user.nickname}
                        profile={user.profile}
                      />
                    </td>
                    <td className="td-radio">
                      <input
                        type="radio"
                        name="king"
                        onChange={() => setManagerId(user.memberId)}
                        checked={managerId == user.memberId}
                        disabled
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="Participants-btn">
          <div>
            <button
              style={{ backgroundColor: "#CE7171" }}
              onClick={onBackClick}
            >
              돌아가기
            </button>
          </div>
          <div>
            <button
              style={{ backgroundColor: "#71c9ce" }}
              onClick={onUpdateClick}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
