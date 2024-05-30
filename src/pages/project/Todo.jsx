import React, { useEffect, useState } from "react";
import "../../styles/pages/Todo.scss";
import { useParams } from "react-router-dom";
import { TodoItem } from "../../component/project/TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TodoCreate } from "../../component/project/TodoCreate";
import { MyTodo } from "../../component/project/MyTodo";
import { OtherTodo } from "../../component/project/OtherTodo";
import { useGetMyTodo } from "../../react-query/useProject";
import { useGetAllTodos } from "../../react-query/useProject";
import { TodoPlusUser } from "../../component/project/TodoPlusUser";

export const Todo = () => {
  const { projectId } = useParams();

  // 볼 사용자 정보 저장하는 변수
  let selectUsers = JSON.parse(localStorage.getItem("selectUsers"));

  // 모든 참여자 데이터 가져오기
  const { data, isLoading } = useGetAllTodos(projectId);

  const [otherUserTodos, setOtherUserTodos] = useState([]);

  // 할일 생성 눌렀는지
  const [onCreate, setOnCreate] = useState(false);
  // 할일 타입 저장
  const [createType, setCreateType] = useState("");

  // 사용자 추가 버튼 눌렀는지
  const [onPlusUser, setOnPlusUser] = useState(false);

  const onCreateClick = (type) => {
    setCreateType(type);
    setOnCreate(true);
  };

  useEffect(() => {
    selectUsers = JSON.parse(localStorage.getItem("selectUsers"));

    if (data && data.data) {
      let updatedTodos = selectUsers?.map((user1) => {
        const todosForUser = data.data.find((user) => user.owner == user1);
        console.log(todosForUser);
        return todosForUser
          ? { nickname: user1, todoList: todosForUser.todoList }
          : { nickname: user1, todoList: [] };
      });

      setOtherUserTodos(updatedTodos);
    }
  }, [data, onPlusUser]); // `otherUserTodos`가 의존성 배열에 포함되지 않도록 주의

  return (
    <DragDropContext>
      <div className="Todo">
        {onPlusUser ? (
          <TodoPlusUser
            projectId={projectId}
            setOnPlusUser={setOnPlusUser}
          ></TodoPlusUser>
        ) : null}
        {onCreate ? (
          <TodoCreate
            setOnCreate={setOnCreate}
            createType={createType}
            setCreateType={setCreateType}
            projectId={projectId}
          />
        ) : null}
        <MyTodo onCreateClick={onCreateClick} projectId={projectId}></MyTodo>
        {otherUserTodos?.map((todo) => (
          <OtherTodo nickname={todo.nickname} />
        ))}

        <button
          className="Todo-plusBtn"
          onClick={() => {
            setOnPlusUser(true);
          }}
        >
          + 사용자 추가하기
        </button>
      </div>
    </DragDropContext>
  );
};

export function TodoWillIcon({ onClick }) {
  return (
    <div
      className="TodoWillIcon"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div style={{ marginRight: "10px", fontSize: "10px" }}>
        <FontAwesomeIcon icon={faCircle} style={{ fontSize: "5px" }} />
      </div>
      해야 할 일
    </div>
  );
}

export function TodoIngIcon({ onClick }) {
  return (
    <div
      className="TodoIngIcon"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div style={{ marginRight: "10px", fontSize: "10px" }}>
        <FontAwesomeIcon icon={faCircle} style={{ fontSize: "5px" }} />
      </div>
      진행중
    </div>
  );
}

export function TodoDoneIcon({ onClick }) {
  return (
    <div
      className="TodoDoneIcon"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div style={{ marginRight: "10px", fontSize: "10px" }}>
        <FontAwesomeIcon icon={faCircle} style={{ fontSize: "5px" }} />
      </div>
      완료
    </div>
  );
}