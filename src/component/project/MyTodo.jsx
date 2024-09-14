import React from "react";
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

  // 드래그를 놨을 때 실행할 함수
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
      // 이동할 아이템 저장
      const [movedItem] = updatedItems.splice(source.index, 1);
      // 목적지 index 위치에 이동할 아이템 추가
      updatedItems.splice(destination.index, 0, movedItem);
      newTodos[start] = updatedItems;
      // 사용자에게 변화된 아이템을 렌더링하기 위해 state 변경
      setTodos(newTodos);
    } else {
      // 다른 항목 이동 처리
      const startItems = Array.from(newTodos[start]);
      const [movedItem] = startItems.splice(source.index, 1);
      const finishItems = Array.from(newTodos[finish]);
      finishItems.splice(destination.index, 0, movedItem);
      newTodos[start] = startItems;
      newTodos[finish] = finishItems;
      // 사용자에게 변화된 아이템을 렌더링하기 위해 state 변경
      setTodos(newTodos);
      const data = { state: destination.droppableId };
      // 변경된 결과를 서버에게 전송
      updateMutate({ taskId: movedItem.id, data });
    }
  };

  return (
    <div className="MyTodo">
      <p style={{ marginBottom: "10px", fontWeight: "bold" }}>나의 할 일</p>
      <div className="Todo-wrap">
        <DragDropContext onDragEnd={onDragEnd}>
          {["BEFORE", "ONGOING", "AFTER"].map((type) => (
            <Droppable droppableId={type} key={type} drap>
              {(provided) => (
                <div className={`Todo-${type}`}>
                  <div className={`Todo-${type}-title`}>
                    {type === "BEFORE" && <TodoWillIcon />}
                    {type === "ONGOING" && <TodoIngIcon />}
                    {type === "AFTER" && <TodoDoneIcon />}
                  </div>
                  <div
                    className={`Todo-${type}-list`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <button
                      onClick={() => onCreateClick(type)}
                      style={buttonStyles(type)}
                    >
                      + 새로 만들기
                    </button>
                    {todos[type].map((item, index) => (
                      <div className="">
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
                              style={{
                                ...provided.draggableProps.style,
                                marginBottom: "10px",
                              }}
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
