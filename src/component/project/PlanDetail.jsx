import React, { useEffect, useRef, useState } from "react";
import "../../styles/project/PlanDetail.scss";
import { useGetDetailPlan } from "../../react-query/useProject";
import { User } from "./User";
import { useDeletePlan } from "../../react-query/useProject";
import useProjectStroe from "../../store/project/useProjectStore";
import { updatePlan } from "../../apis/projectApis";
import { UpdatePlan } from "./UpdatePlan";

export const PlanDetail = ({ setDetail, setSelectedEvent, selectedEvent }) => {
  // 수정 버튼 눌렀는지
  const [onUpdate, setOnUpdate] = useState(false);

  // 대표자 아이디 가져오기
  const { managerId, projectId } = useProjectStroe();

  // 일정 삭제 mutate
  const { mutate, status } = useDeletePlan(selectedEvent.id, projectId);

  // 배경 클릭하면 모달창 닫기
  const backgroundRef = useRef(null);
  const onBackgroundClick = (e) => {
    if (e.target === backgroundRef.current) {
      setSelectedEvent(null);
      setDetail(false);
    }
  };

  // 수정하기 버튼 눌렀을때 실행
  const onClickUpdate = () => {
    setOnUpdate(true);
  };

  // 삭제 버튼 눌렀을때
  const onDelte = () => {
    if (localStorage.getItem("memberId") != managerId) {
      alert("프로젝트 관리자만 삭제가능합니다!");
      return;
    }
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    // 사용자가 확인을 누른 경우에만 mutate 함수 실행
    if (isConfirmed) {
      mutate();
      setSelectedEvent(null);
      setDetail(false);
    }
  };

  // 서버에서 받아온 데이터 저장할 변수
  const [event, setEvent] = useState(null);

  const { data, isLoading } = useGetDetailPlan(selectedEvent.id);

  useEffect(() => {
    if (data) {
      let start;
      let end;
      let today;
      const [startDate, startTime] = data?.data.startedAt.split(" ");
      const [endDate, endTime] = data?.data.endedAt.split(" ");
      if (startDate == endDate) {
        start = startTime;
        end = endTime;
        today = startDate;
      } else {
        start = startDate;
        end = endDate;
        today = null;
      }

      setEvent({ ...data?.data, start, end, today });
    }
  }, [data]);

  return (
    <div className="PlanDetail" ref={backgroundRef} onClick={onBackgroundClick}>
      {onUpdate ? <UpdatePlan setOnUpdate={setOnUpdate} event={event} /> : null}
      <div className="PlanDetail-wrap">
        <h2>{selectedEvent.title}</h2>
        {isLoading ? (
          "로딩중... "
        ) : (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <span>
                <div style={{ fontWeight: "600" }}>시간</div>
                {event?.today != null ? (
                  <span style={{ marginRight: "10px" }}>{event?.today}</span>
                ) : null}
                <span>
                  {event?.start} ~ {event?.end}
                </span>
              </span>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <div style={{ fontWeight: "600" }}>참석자 </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {event?.participants.map((user) => (
                  <User
                    width="80"
                    imgWidht="30"
                    imgHeight="30"
                    nickname={user.nickname}
                    profile={user.profile}
                    button={"none"}
                    fontSize={14}
                  />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "25px" }}>
              <div style={{ fontWeight: "600" }}>설명</div>
              <div style={{ whiteSpace: "pre-line" }}>{event?.content}</div>
            </div>
            <div className="PlanDetail-button">
              <div>
                <button
                  style={{ backgroundColor: "#CE7171" }}
                  onClick={onDelte}
                >
                  삭제하기
                </button>
              </div>
              <div>
                <button
                  style={{ backgroundColor: "#71c9ce" }}
                  onClick={onClickUpdate}
                >
                  수정하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
