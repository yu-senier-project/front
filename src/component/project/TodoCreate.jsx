import React, { useEffect, useRef, useState } from "react";
import "../../styles/project/TodoCreate.scss";
import { InviteProjectUser } from "./InviteProjectUser";
import { User } from "./User";
import {
  TodoDoneIcon,
  TodoIngIcon,
  TodoWillIcon,
} from "../../pages/project/Todo";
import { SelectBox } from "./SelectBox";
import { useCreateTodo } from "../../react-query/useProject";

export const TodoCreate = ({
  setOnCreate,
  createType,
  setCreateType,
  projectId,
}) => {
  const { mutate, status } = useCreateTodo(projectId);

  const background = useRef(null);

  const inputRef = useRef(null);

  // 타입 선택창 열기
  const [onType, setOnType] = useState(false);

  // 할일 제목
  const [title, setTitle] = useState("");

  // 참여자 저장
  const [participantList, setParticipantList] = useState([]);

  const backgroundRef = useRef(null);
  const backgroundRefClick = (e) => {
    if (
      onType &&
      (!background.current ||
        background.current.contains(e.target) ||
        e.target != background.current)
    ) {
      setOnType(false);
    }
    if (e.target == backgroundRef.current) {
      setOnCreate(false);
    }
  };

  const onIngClick = () => {
    setCreateType("ONGOING");
  };
  const onDoneClick = () => {
    setCreateType("AFTER");
  };
  const onWillClick = () => {
    setCreateType("BEFORE");
  };

  // 일정 생성함수
  const submit = () => {
    if (title == "") {
      alert("제목을 입력해주세요!");
      return;
    }
    const data = {
      content: title,
      state: createType,
    };
    mutate(data);
    setOnCreate(false);
    alert("생성완료");
  };

  // 처음 랜더링시 인풋에 포커스 주기
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const EnterClick = (e) => {
    if (e.key == "Enter") {
      submit();
    }
  };

  return (
    <div
      className="TodoCreate"
      ref={backgroundRef}
      onClick={backgroundRefClick}
    >
      <div className="TodoCreate-wrap">
        <div>
          <div className="TodoCreate-title">
            <p>제목</p>
            <input
              onKeyDown={EnterClick}
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="TodoCreate-type">
            <p>유형</p>
            <div style={{ position: "relative" }} ref={background}>
              {createType == "ONGOING" ? (
                <TodoIngIcon
                  onClick={() => {
                    setOnType(!onType);
                  }}
                />
              ) : createType == "AFTER" ? (
                <TodoDoneIcon
                  onClick={() => {
                    setOnType(!onType);
                  }}
                />
              ) : (
                <TodoWillIcon
                  onClick={() => {
                    setOnType(!onType);
                  }}
                />
              )}
              {onType ? (
                <SelectBox
                  onIngClick={onIngClick}
                  onDoneClick={onDoneClick}
                  onWillClick={onWillClick}
                />
              ) : null}
            </div>
          </div>
          <div className="TodoCreate-btn">
            <div>
              <button
                onClick={() => {
                  setOnCreate(false);
                }}
                style={{
                  backgroundColor: "#CE7171",
                }}
              >
                돌아가기
              </button>
            </div>
            <div>
              <button
                onClick={submit}
                style={{
                  backgroundColor: "#71c9ce",
                }}
              >
                생성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
