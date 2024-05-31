import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Main package
import dayGridPlugin from "@fullcalendar/daygrid"; // Day grid plugin
import interactionPlugin from "@fullcalendar/interaction"; // Enables dragging and resizing
import styled from "styled-components";
import { CreateSchedule } from "./CreateSchedule";
import useProjectStore from "../../store/project/useProjectStore";
import { useGetPlanList } from "../../react-query/useProject";
import { PlanDetail } from "./PlanDetail";
import { useSearchParams } from "react-router-dom";
import { useUpdatePlanDate } from "../../react-query/useProject";

const FullCalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  // 캘린더 전체 사이즈 조정
  .fc {
    width: 70%;
  }

  // toolbar container
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0px;
    padding: 0 40px;
    background-color: #356eff;
    height: 63px;
    font-weight: 600;
    font-size: 12px;
    line-height: 29px;
    color: white;
    border-radius: 20px 20px 0px 0px;
  }

  // toolbar 버튼
  .fc .fc-button-primary {
    background-color: transparent;
    border: none;

    span {
      font-weight: 500;
      font-size: 28px;
    }

    :hover {
      background-color: transparent;
    }
  }

  // 요일 부분
  .fc-theme-standard th {
    height: 20px;
    padding-top: 3.5px;
    background: #e5edff;
    border: 1px solid #dddee0;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #7b7b7b;
  }

  // 오늘 날짜 배경색
  .fc .fc-daygrid-day.fc-day-today {
    background-color: #fff8bd;
    color: #356eff;
  }

  // 날짜별 그리드
  .fc .fc-daygrid-day-frame {
    /* padding: 10px; */
  }

  // 날짜  ex) 2일
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 3px;
  }

  // 각 이벤트 요소
  .fc-event {
    cursor: pointer;
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    background-color: lightgrey;
    border: none;
    border-left: 5px solid lightblue;
    white-space: nowrap; // 텍스트가 한 줄로 표시되게 설정
    overflow-x: auto; // 가로 스크롤이 가능하게 설정
  }
`;

export const Calendar = () => {
  // 매니저 아이디 저장
  const [searchParams, setSearchParams] = useSearchParams();
  const managerId = searchParams.get("memberId");
  const { setManagerId, projectId } = useProjectStore();
  useEffect(() => {
    if (managerId) {
      setManagerId(managerId);
    }
  }, [managerId, setManagerId]);

  // 일정 날짜 변경하는 mutate
  const { mutate, status } = useUpdatePlanDate(projectId);

  // 일정 생성 버튼 눌렀는지 or 날짜를 클릭해도 뜨게
  const [onCreate, setOnCreate] = useState(false);

  // 일정 상세보기 클릭했는지
  const [onDetail, setDetail] = useState(false);

  //클릭한 일정 정보 저장할 변수
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 이벤트 정보 가져오기
  const { data, isLoading } = useGetPlanList(projectId);

  // 일정 저장 state
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let event = data?.data?.map((plan, index) => {
      const colors = [
        "hsl(0, 50%, 70%)", // Red
        "hsl(30, 50%, 70%)", // Orange
        "hsl(60, 50%, 70%)", // Yellow
        "hsl(90, 50%, 70%)", // Light Green
        "hsl(120, 50%, 70%)", // Green
        "hsl(150, 50%, 70%)", // Greenish Cyan
        "hsl(180, 50%, 70%)", // Cyan
        "hsl(210, 50%, 70%)", // Light Blue
        "hsl(240, 50%, 70%)", // Blue
        "hsl(270, 50%, 70%)", // Purple
        "hsl(300, 50%, 70%)", // Magenta
        "hsl(330, 50%, 70%)", // Pink
        "hsl(360, 50%, 70%)", // Red
      ];
      return {
        id: plan.planId,
        title: plan.planName,
        start: plan.startedAt,
        end: plan.endedAt,
        backgroundColor: colors[index % colors.length],
      };
    });
    setEvents(event);
  }, [data]);

  // 날짜 클릭했을 때 해당 날짜를 일정 생성에 넘기기 위한 state
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const handleDateClick = (arg) => {
    setOnCreate(true);

    setStart(arg.dateStr);
    setEnd(arg.dateStr);
  };

  // 이벤트 클릭했을 떄
  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setDetail(true);
  };

  // 일정 이동했을때
  const handleEventDrop = (info) => {
    const currentEvent = events.filter((event) => event.id == info.event.id)[0];
    const preStart = currentEvent.start.split(" ")[1];
    const preEnd = currentEvent.end.split(" ")[1];

    const start = new Date(info.event.start);
    const end = new Date(info.event.end);

    const startYear = start.getFullYear();
    const startMonth =
      start.getMonth() + 1 < 10
        ? `0${start.getMonth() + 1}`
        : start.getMonth() + 1;
    const startDay =
      start.getDate() < 10 ? `0${start.getDate()}` : start.getDate();

    const endYear = end.getFullYear();
    const endMonth =
      end.getMonth() + 1 < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1;
    const endDay = end.getDate() < 10 ? `0${end.getDate()}` : end.getDate();

    const startedAt = `${startYear}-${startMonth}-${startDay} ${preStart}`;
    const endedAt = `${endYear}-${endMonth}-${endDay} ${preEnd}`;
    const data = {
      startedAt,
      endedAt,
    };
    mutate({ planId: info.event.id, data });

    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? { ...event, start: info.event.start, end: info.event.end }
        : event
    );
    setEvents(updatedEvents);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <div className="calendar-container">
      <FullCalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventContent={renderEventContent}
          editable={true}
          droppable={true}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "today,next",
          }}
          titleFormat={(date) => {
            let year = date.date.array[0];
            let month = date.date.array[1] + 1;

            return year + "년 " + month + "월";
          }}
        />
      </FullCalendarContainer>

      {onCreate ? (
        <CreateSchedule setOnCreate={setOnCreate} start={start} end={end} />
      ) : null}

      {onDetail ? (
        <PlanDetail
          setDetail={setDetail}
          setSelectedEvent={setSelectedEvent}
          selectedEvent={selectedEvent}
        />
      ) : null}
    </div>
  );
};
