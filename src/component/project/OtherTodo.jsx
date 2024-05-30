import React from "react";
import "../../styles/project/OtherTodo.scss";
import { TodoItem } from "./TodoItem";
import {
  TodoWillIcon,
  TodoDoneIcon,
  TodoIngIcon,
} from "../../pages/project/Todo";

export const OtherTodo = ({ nickname }) => {
  const items = {
    will: [
      { id: "1", content: "할 일 1" },
      { id: "2", content: "할 일 2" },
      { id: "3", content: "할 일 3" },
    ],
    ing: [
      { id: "4", content: "진행중 1" },
      { id: "5", content: "진행중 2" },
      { id: "6", content: "진행중 3" },
    ],
    done: [
      { id: "7", content: "완료 1" },
      { id: "8", content: "완료 2" },
      { id: "9", content: "완료 3" },
    ],
  };
  return (
    <div className="OtherTodo">
      <p style={{ marginBottom: "10px" }}>
        <span style={{ fontWeight: "bold" }}>{nickname}</span>님의 할 일
      </p>
      <div className="OtherTodo-wrap">
        {["BEFORE", "ONGOING", "AFTER"].map((type) => (
          <div className={`Todo-${type}`}>
            <div className={`Todo-${type}-title`}>
              {type === "BEFORE" && <TodoWillIcon />}
              {type === "ONGOING" && <TodoIngIcon />}
              {type === "AFTER" && <TodoDoneIcon />}
            </div>
            <div className={`Todo-${type}-list`}>
              {items[type]?.map((item, index) => (
                <TodoItem type={type} content={item.content} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
