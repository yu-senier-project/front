import React from "react";
import "../../styles/basic/Setting.scss";
export const Setting = ({ width, handleUpdateButtonClick }) => {
  const settingTitleList = [
    {
      title: "삭제하기",
      onClick: null,
    },
    {
      title: "수정하기",
      onClick: handleUpdateButtonClick,
    },
  ];

  const className = `Setting width-${width}`;

  return (
    <div className={className}>
      {settingTitleList.map((item, idx) => (
        <div key={idx} className="Setting-list" onClick={item.onClick}>
          {item.title}
        </div>
      ))}
    </div>
  );
};
