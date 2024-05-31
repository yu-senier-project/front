import React from "react";
import "../../styles/project/TodoItem.scss";
import {
  TodoDoneIcon,
  TodoIngIcon,
  TodoWillIcon,
} from "../../pages/project/Todo";
export const SelectBox = ({ onIngClick, onDoneClick, onWillClick }) => {
  return (
    <div className="selectBox">
      <div onClick={onWillClick}>
        <TodoWillIcon />
      </div>
      <div onClick={onIngClick}>
        <TodoIngIcon />
      </div>
      <div onClick={onDoneClick}>
        <TodoDoneIcon />
      </div>
    </div>
  );
};
