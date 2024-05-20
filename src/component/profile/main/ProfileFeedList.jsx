import React from "react";
import "../../../styles/profile/ProfileFeedList.scss";
import { ProfileLikeFeedList } from "./ProfileLikeFeedList";
import { ProfileMyFeedList } from "./ProfileMyFeedList";

export const ProfileFeedList = ({
  start,
  end,
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
          start={start}
          end={end}
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
