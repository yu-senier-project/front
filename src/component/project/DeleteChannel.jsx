import React, { useEffect, useState, useRef } from "react";
import "../../styles/project/DeleteChannel.scss";
import useProjectStore from "../../store/project/useProjectStore";
import { useDeleteChannel } from "../../react-query/useProject";

export const DeleteChannel = ({ setOnDelete, channelId }) => {
  const { projectId } = useProjectStore();

  // 채널 삭제 mutate
  const { mutate, status } = useDeleteChannel(projectId, channelId);

  // 배경 클릭하면 모달창 닫기
  const backgroundRef = useRef(null);
  const onBackgroundClick = (e) => {
    if (e.target === backgroundRef.current) {
      setOnDelete(false);
    }
  };

  // 삭제 버튼 클릭 시 호출
  const handleDelete = () => {
    mutate(); // 삭제 API 호출
    setOnDelete(false); // 모달 닫기
  };

  // 취소 버튼 클릭 시 호출
  const handleCancel = () => {
    setOnDelete(false); // 모달 닫기
  };

  return (
    <div
      className="DeleteChannel"
      ref={backgroundRef}
      onClick={onBackgroundClick}
    >
      <div className="DeleteChannel-wrap">
        <h4>채널 삭제</h4>
        <div className="DeleteChannel-title">
          <p>정말로 이 채널을 삭제하시겠습니까?</p>
        </div>
        <div className="DeleteChannel-buttons">
          <button className="delete-btn2" onClick={handleDelete}>
            삭제
          </button>
          <button className="cancel-btn2" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
