import React, { useState, useRef } from "react";
import "../../styles/project/TodoItem.scss";
import {
  TodoDoneIcon,
  TodoWillIcon,
  TodoIngIcon,
} from "../../pages/project/Todo";
import { User } from "./User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { SelectBox } from "./SelectBox";
import { Setting } from "../basic/Setting";
import { useDeleteTodo } from "../../react-query/useProject";
import { useUpdateTodoState } from "../../react-query/useProject";
import { ElevatorSharp } from "@mui/icons-material";

export const TodoItem = ({
  type,
  my,
  content,
  id,
  projectId,
  todos,
  setTodos,
}) => {
  // 할일 삭제하는 mutate
  const { mutate, status } = useDeleteTodo(projectId, id);

  // 할일 상태 없데이트 mutate
  const { mutate: updateMutate } = useUpdateTodoState(projectId);

  // 할 일 삭제
  const onDelete = () => {
    let bool = window.confirm("정말 삭제하시겠습니까?");
    if (bool) {
      mutate();
    }
  };

  const onIngClick = () => {
    if (type == "ONGOING") {
      return;
    } else {
      const todoItem = todos[type].find((todo) => todo.id == id);
      console.log(todoItem);
      const updatedTodos = {
        ...todos,
        [type]: todos[type].filter((todo) => todo.id != id),
        ONGOING: [...todos.ONGOING, { ...todoItem }],
      };
      console.log(updatedTodos);
      setTodos(updatedTodos); // 낙관적 업데이트
      const data = { state: "ONGOING" };
      updateMutate(data);
    }
  };

  const onWillClick = () => {
    if (type == "BEFORE") {
      return;
    } else {
      const todoItem = todos[type].find((todo) => todo.id == id);
      const updatedTodos = {
        ...todos,
        [type]: todos[type].filter((todo) => todo.id != id),
        BEFORE: [...todos.BEFORE, { ...todoItem, type: "BEFORE" }],
      };
      setTodos(updatedTodos); // 낙관적 업데이트
      const data = { state: "BEFORE" };
      updateMutate({ taskId: id, data });
    }
  };

  const onDoneClick = () => {
    if (type == "AFTER") {
      return;
    } else {
      const todoItem = todos[type].find((todo) => todo.id == id);
      const updatedTodos = {
        ...todos,
        [type]: todos[type].filter((todo) => todo.id != id),
        AFTER: [...todos.AFTER, { ...todoItem, type: "AFTER" }],
      };
      setTodos(updatedTodos); // 낙관적 업데이트
      const data = { state: "AFTER" };
      updateMutate(data);
    }
  };

  // 세팅버튼 눌렀는지
  const [onSetting, setOnSetting] = useState(false);
  const settingTitleList = [{ title: "삭제하기", onClick: onDelete }];

  const ClickSetting = () => {
    setOnSetting(!onSetting);
  };

  const [onTypeChange, setOnTypeChange] = useState(false);
  const background = useRef(null);
  const backgroundClick = (e) => {
    if (
      onTypeChange &&
      (!background.current ||
        background.current.contains(e.target) ||
        e.target != background.current)
    ) {
      setOnTypeChange(false);
    }
    if (onSetting) {
      setOnSetting(false);
    }
  };

  return (
    <div className="TodoItem" onClick={backgroundClick}>
      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          position: "relative",
        }}
      >
        <div style={{ overflow: "scroll", width: "90%" }}>{content}</div>

        {my ? (
          <div
            style={{
              width: "3%",
              cursor: "pointer",
            }}
            onClick={ClickSetting}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        ) : null}
        {onSetting ? (
          <div className="TodoItem-setting">
            <Setting settingTitleList={settingTitleList} width={150} />
          </div>
        ) : null}
      </p>

      <div style={{ display: "flex", position: "relative" }} ref={background}>
        {type == "ONGOING" && (
          <TodoIngIcon
            onClick={
              my
                ? () => {
                    setOnTypeChange(!onTypeChange);
                  }
                : null
            }
          />
        )}
        {type == "AFTER" && (
          <div
            onClick={
              my
                ? () => {
                    setOnTypeChange(!onTypeChange);
                  }
                : null
            }
          >
            <TodoDoneIcon />
          </div>
        )}
        {type == "BEFORE" && (
          <div
            onClick={
              my
                ? () => {
                    setOnTypeChange(!onTypeChange);
                  }
                : null
            }
          >
            <TodoWillIcon />
          </div>
        )}
        {onTypeChange ? (
          <SelectBox
            onIngClick={onIngClick}
            onWillClick={onWillClick}
            onDoneClick={onDoneClick}
          />
        ) : null}
      </div>
    </div>
  );
};
