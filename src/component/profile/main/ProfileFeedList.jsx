import React from "react";
import "../../../styles/profile/ProfileFeedList.scss";
import { ProfileLikeFeedList } from "./ProfileLikeFeedList";
import { ProfileMyFeedList } from "./ProfileMyFeedList";

export const ProfileFeedList = ({
  memberId,
  selectMenu,
  filterType,
  startDate,
  endDate,
}) => {
  return (
    <div className="ProfileFeedList">
      {selectMenu === 1 ? (
        <ProfileMyFeedList
          memberId={memberId}
          filterType={filterType}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <ProfileLikeFeedList memberId={memberId} />
      )}
    </div>
  );
};
