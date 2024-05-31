import React, { useEffect, useRef, useState } from "react";
import "../../styles/project/CreateSchedule.scss";
import { ToggleButton } from "../../styles/project/ToggleButton";
import { InviteProjectUser } from "./InviteProjectUser";
import { useUpdatePlan } from "../../react-query/useProject";
import useProjectStore from "../../store/project/useProjectStore";
import { partialRight } from "lodash";

export const UpdatePlan = ({ setOnUpdate, start, end, event }) => {
  // projectId 가져오기
  const { projectId } = useProjectStore();

  // 일정 생성 mutate
  const { mutate, status } = useUpdatePlan(event.planId);

  // 배경 클릭하면 모달창 닫기
  const backgroundRef = useRef(null);
  const onBackgroundClick = (e) => {
    if (e.target === backgroundRef.current) {
      setOnUpdate(false);
    }
  };

  // 일정 제목
  const [planName, setPlanName] = useState(event?.planName);
  // 일정 내용
  const [content, setContent] = useState(event?.content);

  //스케쥴 생성 단계
  const [stage, setStage] = useState(1);

  // 일정 참여자
  const [originParticipantList, setOriginParticipantList] = useState(
    event.participants
  );
  const [participantList, setParticipantList] = useState(event.participants);

  // 원래 일정 참여자가 바뀌었는지 확인하는 함수
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].memberId !== b[i].memberId) return false;
    }
    return true;
  };

  // 시간 배열
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);

  useEffect(() => {
    // 시간 배열 초기화
    const hourArray = Array.from({ length: 24 }, (_, i) => i);
    setHours(hourArray);

    // 분 배열 초기화
    const minuteArray = Array.from({ length: 60 }, (_, i) =>
      i < 10 ? `0${i}` : `${i}`
    );
    setMinutes(minuteArray);
  }, []);

  // 종일 버튼 눌렀는지 안눌렀는지
  const [toggle, setToggle] = useState(event.today != null ? false : true);

  // 종일 일때 기간 선택
  const [startDate, setStartDate] = useState(event.today ?? event.start);
  const [endDate, setEndDate] = useState(event.end);

  // 종일 아닐때 날짜 선택
  const [date, setDate] = useState(event.today ?? event.start);

  // 시간 선택 상태
  const [startHour, setStartHour] = useState(event.start.slice(0, 2));
  const [startMinute, setStartMinute] = useState(event.start.slice(3));
  const [endHour, setEndHour] = useState(event.end.slice(0, 2));
  const [endMinute, setEndMinute] = useState(event.end.slice(3));

  // 일저 생성 함수
  const onSubmit = () => {
    let inviteList;
    let startedAt;
    let endedAt;
    if (toggle) {
      startedAt = `${startDate} 00:00`;
      endedAt = `${endDate} 23:59`;
    } else {
      startedAt = `${date} ${
        startHour < 10 ? `0${startHour}` : startHour
      }:${startMinute}`;
      endedAt = `${date} ${
        endHour < 10 ? `0${endHour}` : endHour
      }:${endMinute}`;
    }

    let bool = arraysEqual(originParticipantList, participantList);
    if (!bool) {
      inviteList = participantList.map((user) => user.memberId);
    } else {
      inviteList = [];
    }

    const data = {
      planName,
      startedAt,
      endedAt,
      content,
      inviteList,
    };

    console.log(data);
    mutate(data);
    setOnUpdate(false);
  };

  // startHour 바꾸면 endHour 바꾸는 코드
  useEffect(() => {
    // startHour가 endHour보다 클 경우 endHour를 startHour로 맞춤
    if (startHour > endHour) {
      setEndHour(startHour);
    }
  }, [startHour]);

  return (
    <div
      className="CreateSchedule"
      ref={backgroundRef}
      onClick={onBackgroundClick}
    >
      <div className="CreateSchedule-wrap">
        {stage === 1 ? (
          <div>
            <h4>일정 변경</h4>
            <div className="CreateSchedule-title">
              <input
                type="text"
                placeholder="제목"
                value={planName}
                onChange={(e) => {
                  setPlanName(e.target.value);
                }}
              />
            </div>
            <div className="CreateSchedule-clock">
              {toggle ? (
                <>
                  <div>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <p> ~ </p>
                  <div>
                    <input
                      min={startDate}
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                // 종일 아닌거
                <>
                  <div className="startTime">
                    <select
                      name="startHour"
                      value={startHour}
                      onChange={(e) => setStartHour(Number(e.target.value))}
                    >
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {`${hour}시`}
                        </option>
                      ))}
                    </select>
                    :
                    <select
                      name="startMinute"
                      value={startMinute}
                      onChange={(e) => setStartMinute(e.target.value)}
                    >
                      {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                          {`${minute}분`}
                        </option>
                      ))}
                    </select>
                  </div>
                  ~
                  <div className="endTime">
                    <select
                      name="endHour"
                      value={endHour}
                      onChange={(e) => setEndHour(Number(e.target.value))}
                    >
                      {hours.map((hour) => (
                        <option
                          key={hour}
                          value={hour}
                          disabled={hour < startHour}
                        >
                          {`${hour}시`}
                        </option>
                      ))}
                    </select>
                    :
                    <select
                      name="endMinute"
                      value={endMinute}
                      onChange={(e) => setEndMinute(e.target.value)}
                    >
                      {minutes.map((minute) => (
                        <option
                          key={minute}
                          value={minute}
                          disabled={
                            startHour === endHour &&
                            parseInt(minute) <= parseInt(startMinute)
                          }
                        >
                          {`${minute}분`}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            {toggle ? null : (
              <div className="CreateSchedule-noToggle-date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="CreateSchedule-toggle">
              <ToggleButton toggle={toggle} setToggle={setToggle} />
              <p
                className={toggle ? null : "grey"}
                style={{ marginLeft: "5px" }}
              >
                종일
              </p>
            </div>
            <div className="CreateSchedule-content">
              <textarea
                name=""
                id=""
                placeholder="설명"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="CreateSchedule-nextBtn">
              <button
                onClick={() => {
                  setStage(2);
                }}
              >
                다음
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h4>참여자 추가</h4>
            <InviteProjectUser
              participantList={participantList}
              setParticipantList={setParticipantList}
            />
            <div className="CreateSchedule-done">
              <div>
                <button
                  style={{ backgroundColor: "#CE7171" }}
                  onClick={() => {
                    setStage(1);
                    setParticipantList([]);
                  }}
                >
                  이전
                </button>
              </div>
              <div>
                <button onClick={onSubmit}>생성</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
