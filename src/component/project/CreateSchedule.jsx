import React, { useEffect, useRef, useState } from "react";
import "../../styles/project/CreateSchedule.scss";
import { ToggleButton } from "../../styles/project/ToggleButton";
import { InviteProjectUser } from "./InviteProjectUser";
import { useCreatePlan } from "../../react-query/useProject";
import useProjectStore from "../../store/project/useProjectStore";

export const CreateSchedule = ({ setOnCreate, start, end }) => {
  // projectId 가져오기
  const { projectId } = useProjectStore();

  // 일정 생성 mutate
  const { mutate, status } = useCreatePlan(projectId);

  // 배경 클릭하면 모달창 닫기
  const backgroundRef = useRef(null);
  const onBackgroundClick = (e) => {
    if (e.target === backgroundRef.current) {
      setOnCreate(false);
    }
  };

  // 일정 제목
  const [planName, setPlanName] = useState("");
  // 일정 내용
  const [content, setContent] = useState("");

  //스케쥴 생성 단계
  const [stage, setStage] = useState(1);

  const [participantList, setParticipantList] = useState([]);

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
  const [toggle, setToggle] = useState(true);

  // 종일 일때 기간 선택
  const [startDate, setStartDate] = useState(start ?? null);
  const [endDate, setEndDate] = useState(null);

  // 종일 아닐때 날짜 선택
  const [date, setDate] = useState(start ?? null);

  // 시간 선택 상태
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState("00");

  // 일저 생성 함수
  const onSubmit = () => {
    if (participantList.length == 0) {
      alert("참여자를 선택해주세요");
      return;
    }

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

    inviteList = participantList.map((user) => user.memberId);

    const data = {
      planName,
      startedAt,
      endedAt,
      content,
      inviteList,
    };

    mutate(data);
    setOnCreate(false);
  };

  // 다음 버튼 눌렀을 때 실행할 함수
  const onNextBtn = () => {
    if (planName == "") {
      alert("일정 제목을 입력해주세요!");
      return;
    }
    if (content == "") {
      alert("일정 설명을 입력해주세요!");
    }
    if (toggle) {
      if (endDate == null) {
        alert("기간을 설정해주세요");
        return;
      }
      if (startDate == null) {
        alert("기간을 설정해주세요");
        return;
      }
    } else {
      if (date == null) {
        alert("날짜를 선택해주세요");
        return;
      }
    }
    setStage(2);
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
            <h4>새 일정 추가</h4>
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
              <button onClick={onNextBtn}>다음</button>
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
