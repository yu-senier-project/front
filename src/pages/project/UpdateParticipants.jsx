import React, { useEffect, useState } from "react";
import "../../styles/pages/CreateProject.scss";
import "../../styles/pages/UpdateParticipants.scss";
import "react-datepicker/dist/react-datepicker.css";
import { InviteUser } from "../../component/project/InviteUser";
import { useCreateProject } from "../../react-query/useProject";
import { useNavigate } from "react-router-dom";
import {
  useGetProjectParticipants,
  useUpdateProjectParticipant,
} from "../../react-query/useProject";
import useProjectStore from "../../store/project/useProjectStore";
import { Loading } from "../../component/basic/Loading";

export const UpdateParticipants = () => {
  const nav = useNavigate();
  const { projectId } = useProjectStore();

  // 현재 참여자 정보 가져오기
  const { data, isLoading } = useGetProjectParticipants(projectId);

  // 게시물 생성 mutate
  const { mutate, status } = useUpdateProjectParticipant(projectId);

  // 참여자 리스트
  const [participants, setParticipants] = useState([]);

  // 매니저 아이디 저장
  const [managerId, setManagerId] = useState(0);

  useEffect(() => {
    if (data && data.data) {
      setParticipants(data.data.memberList || []);
      setManagerId(data.data.managerId);
    }
  }, [data]);

  if (isLoading) {
    return <Loading text="정보 가져오는중..."></Loading>;
  }

  if (status == "pending") {
    return <Loading text="수정중..."></Loading>;
  }

  // 참여자 수정 버튼 눌렀을 때
  const createProject = () => {
    let memberList = participants.map((user) => user.memberId);
    memberList = memberList.filter((memberId) => managerId !== memberId);

    const projectData = {
      managerId,
      memberList,
    };

    mutate(projectData);
    alert("수정완료!");
  };

  // 취소 버튼 눌렀을 때
  const onCancel = () => {
    nav(-1);
  };

  return (
    <div>
      <div className="CreateProject UpdateParticipants">
        <div className="CreateProject-user">
          <h2>참여자 수정하기</h2>
          <InviteUser
            managerId={managerId}
            setManagerId={setManagerId}
            participants={participants}
            setParticipants={setParticipants}
          />
        </div>
      </div>
      <div className="CreateProject-btn">
        <div>
          <button style={{ backgroundColor: "#CE7171" }} onClick={onCancel}>
            취소
          </button>
        </div>
        <div>
          <button
            style={{ backgroundColor: "#71c9ce" }}
            onClick={createProject}
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};
