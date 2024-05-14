import React, { useEffect, useState } from "react";
import "../styles/pages/Profile.scss";

import { ProfileUser } from "../component/profile/main/ProfileUser";
import { ProfileNav } from "../component/profile/main/ProfileNav";
import { ProfileFilter } from "../component/profile/main/ProfileFilter";
import { ProfileFeedList } from "../component/profile/main/ProfileFeedList";
import { ProfileUpdate } from "../component/profile/update/ProfileUpdate";

export const Profile = () => {
  // 프로필 수정 버튼 눌렀는지
  const [onEdit, setOnEdit] = useState(false);

  //1번이 내가 작성한 글, 2번이 좋아요를 누른글
  const [selectMenu, setSelectMenu] = useState(1);

  // 필터 기준
  const [value, setValue] = useState("최신순");

  // 날짜 필터
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setValue("최신순");
    setStartDate(new Date());
    setEndDate(new Date());
  }, [selectMenu]);

  return (
    <div className="Profile">
      <ProfileUser setOnEdit={setOnEdit} />
      <ProfileNav selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
      <ProfileFilter
        value={value}
        setValue={setValue}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <ProfileFeedList />
      {onEdit ? <ProfileUpdate setOnEdit={setOnEdit} /> : null}
    </div>
  );
};
