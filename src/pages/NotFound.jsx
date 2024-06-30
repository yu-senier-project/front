import React from "react";

import "../styles/NotFound.scss";

export const NotFound = () => {
  const handleGoHome = () => {};

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">페이지를 찾을 수 없습니다</h2>
        <p className="notfound-description">
          찾고 있는 페이지가 삭제되었거나, 주소가 잘못되었을 수 있습니다.
        </p>
      </div>
    </div>
  );
};
