import React, { useRef, useState, useEffect } from "react";
import "../../styles/project/DeleteProject.scss";
import { useDeleteProject } from "../../react-query/useProject";
import useProjectStore from "../../store/project/useProjectStore";
import { useNavigate } from "react-router-dom";

export const DeleteProject = ({ setOnDelete }) => {
  const nav = useNavigate();

  const inputRef = useRef(null);
  const { projectId } = useProjectStore();

  const backgroundRef = useRef(null);
  const backgroundClick = (e) => {
    if (e.target == backgroundRef.current) {
      setOnDelete(false);
    }
  };

  const { mutate, status } = useDeleteProject(projectId);

  const [text, setText] = useState("");

  const onCancle = () => {
    setOnDelete(false);
  };

  const onDeleteClick = () => {
    if (text != "삭제합니다") {
      alert("문구가 일치하지 않습니다.");
      inputRef.current.focus();
      return;
    }
    let bool = window.confirm(
      "삭제된 프로젝트는 복구할 수 없습니다. 정말 삭제하시겠습니까? "
    );
    if (bool) {
      mutate();
      alert("삭제완료");
      nav("/Project");
    }
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") {
      onDeleteClick();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className="DeleteProject"
      ref={backgroundRef}
      onClick={backgroundClick}
    >
      <div className="DeleteProject-wrap">
        <p style={{ marginBottom: "10px" }}>
          프로젝트 삭제를 원하시면 아래의 문구를 적어주세요
        </p>
        <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
          삭제합니다
        </p>
        <input
          onKeyDown={onKeyDown}
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="DeleteProject-btn">
          <div>
            <button style={{ backgroundColor: "#CE7171" }} onClick={onCancle}>
              취소
            </button>
          </div>
          <div>
            <button style={{ backgroundColor: "#71c9ce" }}>완료</button>
          </div>
        </div>
      </div>
    </div>
  );
};
