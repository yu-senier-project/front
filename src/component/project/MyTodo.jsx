import React, { useEffect, useState } from "react";
import { useGetMyTodo } from "../../react-query/useProject";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TodoCreate } from "./TodoCreate";
import { TodoItem } from "./TodoItem";
import {
  TodoWillIcon,
  TodoDoneIcon,
  TodoIngIcon,
} from "../../pages/project/Todo";
import "../../styles/project/MyTodo.scss";
import { useUpdateTodoState } from "../../react-query/useProject";

export const MyTodo = ({
  items,
  onCreateClick,
  projectId,
  todos,
  setTodos,
}) => {
  const { mutate: updateMutate } = useUpdateTodoState(projectId);
  console.log(todos);

  // const { data, isLoading } = useGetMyTodo(projectId);
  // const [todos, setTodos] = useState({
  //   BEFORE: [],
  //   ONGOING: [],
  //   AFTER: [],
  // });

  // // 할일 데이터 저장
  // useEffect(() => {
  //   const newObj = {
  //     BEFORE: [],
  //     ONGOING: [],
  //     AFTER: [],
  //   };
  //   if (data && data.data && data.data.todoList) {
  //     for (let todo of data.data.todoList) {
  //       const type = todo.state;
  //       newObj[type] = [
  //         ...newObj[type],
  //         { id: todo.id, content: todo.content },
  //       ];
  //     }
  //     for (let key in newObj) {
  //       newObj[key].sort((a, b) => b.id - a.id);
  //     }
  //   }
  //   setTodos(newObj);
  // }, [data]);

  // 버튼 스타일 지정하는 함수
  const buttonStyles = (type) => ({
    backgroundColor:
      type === "BEFORE"
        ? "#e7e7e7"
        : type === "ONGOING"
        ? "#88c6ff"
        : "#ff9e9e",
    color: type === "ONGOING" ? "#40A2E3" : type === "AFTER" ? "#ff0404" : "",
    border: "none",
    marginBottom: "10px",
    cursor: "pointer",
  });

  // 드래그를 놨을때 실행할 함수
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    const newTodos = { ...todos };

    if (start === finish) {
      // 동일 목록 내에서 이동 처리
      const updatedItems = Array.from(newTodos[start]);
      const [movedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, movedItem);
      newTodos[start] = updatedItems;
    } else {
      const startItems = Array.from(newTodos[start]);

      const [movedItem] = startItems.splice(source.index, 1);
      console.log(movedItem); // 이동하는 친구
      const finishItems = Array.from(newTodos[finish]);
      finishItems.splice(destination.index, 0, movedItem);
      newTodos[start] = startItems;
      newTodos[finish] = finishItems;
      const data = { state: destination.droppableId };
      updateMutate({ taskId: movedItem.id, data });
    }

    setTodos(newTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="MyTodo">
        <p style={{ marginBottom: "10px", fontWeight: "boldt" }}>나의 할 일</p>
        <div className="Todo-wrap">
          {["BEFORE", "ONGOING", "AFTER"].map((type) => (
            <Droppable droppableId={type} key={type}>
              {(provided) => (
                <div
                  className={`Todo-${type}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={`Todo-${type}-title`}>
                    {type === "BEFORE" && <TodoWillIcon />}
                    {type === "ONGOING" && <TodoIngIcon />}
                    {type === "AFTER" && <TodoDoneIcon />}
                  </div>
                  <div className={`Todo-${type}-list`}>
                    <button
                      onClick={() => onCreateClick(type)}
                      style={buttonStyles(type)}
                    >
                      + 새로 만들기
                    </button>
                    {todos[type].map((item, index) => (
                      <Draggable
                        key={item.id.toString()}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoItem
                              todos={todos}
                              setTodos={setTodos}
                              projectId={projectId}
                              id={item.id.toString()}
                              type={type}
                              content={item.content}
                              my={true}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
