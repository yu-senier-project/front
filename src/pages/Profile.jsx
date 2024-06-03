import React, { useEffect, useState } from "react";
import "../styles/pages/Profile.scss";
import { useParams } from "react-router-dom";

import { ProfileUser } from "../component/profile/main/ProfileUser";
import { ProfileNav } from "../component/profile/main/ProfileNav";
import { ProfileFilter } from "../component/profile/main/ProfileFilter";
import { ProfileFeedList } from "../component/profile/main/ProfileFeedList";
import { ProfileUpdate } from "../component/profile/update/ProfileUpdate";
import { ProfileUpdateImage } from "../component/profile/update/ProfileUpdateImage";
import { ProfileResume } from "../component/profile/resume/ProfileResume";
import { ProfileUpdateCompanyJob } from "../component/profile/CompanyAndJob/ProfileUpdateCompanyJob";
import { useMemberData } from "../react-query/useProfile";
import { Loading } from "../component/basic/Loading";

export const Profile = () => {
  // 맴버 아이디 가져오기
  const myMembrId = localStorage.getItem("memberId");
  const params = useParams();
  const memberId = params.id ?? myMembrId;
  // 내 프로필인지 확인
  const myProfile = params.id == myMembrId;

  // 회원 정보 가져오는 함수
  const { data: memberData, isLoading: memberDataIsLoading } =
    useMemberData(memberId);

  console.log(memberData);

  const [profileImg, setProfileImg] = useState(
    memberData?.data?.profile ?? "/image/dp.jpg"
  );

  useEffect(() => {
    setProfileImg(memberData?.data?.profile ?? "/image/dp.jpg");
  }, [memberData]);

  // 소속 변경 버튼 눌렀을 떄
  const [onChangeCompany, setOnChangeCompany] = useState(false);

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

  // 현재 날짜
  const today = new Date();

  // 한 달 전 날짜 계산
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  // 날짜 필터
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);
  const [start, setStart] = useState(
    `${oneMonthAgo.getFullYear()}-${String(oneMonthAgo.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(oneMonthAgo.getDate()).padStart(2, "0")}`
  );
  const [end, setEnd] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`
  );

  useEffect(() => {
    setValue("최신순");
    // setStartDate(new Date());
    // setEndDate(new Date());
  }, [selectMenu]);

  if (memberDataIsLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="Profile">
      <ProfileUser
        myProfile={myProfile}
        profileImg={profileImg}
        data={memberData}
        setOnChangeCompany={setOnChangeCompany}
        setOnEdit={setOnEdit}
        setImageEdit={setImageEdit}
        setOnResume={setOnResume}
      />
      <ProfileNav
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
        nickname={memberData?.data.nickname}
      />
      {/* 내 게시물에만 필터 넣기  */}
      {selectMenu == 1 ? (
        <ProfileFilter
          value={value}
          setValue={setValue}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setStart={setStart}
          setEnd={setEnd}
        />
      ) : null}
      <ProfileFeedList
        start={start}
        end={end}
        memberId={memberId}
        selectMenu={selectMenu}
        filterType={value}
        startDate={startDate}
        endDate={endDate}
      />

      {/* 프로필 수정 버튼 누르면 모달창 */}
      {onEdit ? (
        <ProfileUpdate
          img={profileImg}
          setOnEdit={setOnEdit}
          date={memberData?.data?.birth}
          intro={memberData?.data?.introduction}
          memberId={memberId}
        />
      ) : null}

      {/* 프로필 사진 수정창 */}
      {onImageEdit ? (
        <ProfileUpdateImage
          setImageEdit={setImageEdit}
          img={profileImg}
          setProfileImg={setProfileImg}
        />
      ) : null}

      {/* 이력서 조회 눌렀는지 */}
      {onResume ? (
        <ProfileResume
          setOnResume={setOnResume}
          memberId={memberId}
          myProfile={myProfile}
        />
      ) : null}

      {/* 소속 변경 버튼 눌렀는지 */}
      {onChangeCompany ? (
        <ProfileUpdateCompanyJob
          data={memberData}
          setOnChangeCompany={setOnChangeCompany}
        ></ProfileUpdateCompanyJob>
      ) : null}
    </div>
  );
};
