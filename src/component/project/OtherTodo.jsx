import React, { useState, useEffect } from "react";
import "../../styles/project/OtherTodo.scss";
import { TodoItem } from "./TodoItem";
import {
  TodoWillIcon,
  TodoDoneIcon,
  TodoIngIcon,
} from "../../pages/project/Todo";
import { constructNow } from "date-fns";

export const OtherTodo = ({ nickname, todoList }) => {
  console.log(nickname, todoList);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todoList.length != 0) {
      const newObj = {
        BEFORE: [],
        ONGOING: [],
        AFTER: [],
      };
      for (let todo of todoList) {
        const type = todo.state;
        newObj[type] = [
          ...newObj[type],
          { id: todo.id, content: todo.content },
        ];
      }
      for (let key in newObj) {
        newObj[key].sort((a, b) => b.id - a.id);
      }

      setTodos(newObj);
    }
  }, [nickname]);

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
              {todos[type]?.map((item, index) => (
                <TodoItem type={type} content={item.content} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
