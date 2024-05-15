import React, { useEffect, useState } from "react";
import "../styles/pages/Profile.scss";

import { ProfileUser } from "../component/profile/main/ProfileUser";
import { ProfileNav } from "../component/profile/main/ProfileNav";
import { ProfileFilter } from "../component/profile/main/ProfileFilter";
import { ProfileFeedList } from "../component/profile/main/ProfileFeedList";
import { ProfileUpdate } from "../component/profile/update/ProfileUpdate";
import { ProfileUpdateImage } from "../component/profile/update/ProfileUpdateImage";
import { ProfileResume } from "../component/profile/resume/ProfileResume";

export const Profile = () => {
  // 프로필 수정 버튼 눌렀는지
  const [onEdit, setOnEdit] = useState(false);

  // 프로필 이미지 수정 버튼 눌렀는지
  const [onImageEdit, setImageEdit] = useState(false);

  // 이력서 조회 버튼 눌렀을 떄
  const [onResume, setOnResume] = useState(false);

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
      <ProfileUser
        setOnEdit={setOnEdit}
        setImageEdit={setImageEdit}
        setOnResume={setOnResume}
      />
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

      {/* 프로필 수정 버튼 누르면 모달창 */}
      {onEdit ? <ProfileUpdate setOnEdit={setOnEdit} /> : null}

      {/* 프로필 사진 수정창 */}
      {onImageEdit ? <ProfileUpdateImage setImageEdit={setImageEdit} /> : null}

      {/* 이력서 조회 눌렀는지 */}
      {onResume ? <ProfileResume setOnResume={setOnResume} /> : null}
    </div>
  );
};
