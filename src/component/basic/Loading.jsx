import React from "react";
import { BeatLoader } from "react-spinners";
import "../../styles/basic/Loading.scss";

export const Loading = ({ text }) => {
  return (
    <div className="Loading">
      <div className="Loading-icon">
        <div>
          <BeatLoader
            color="#36b4d6"
            cssOverride={{}}
            loading
            margin={2}
            size={44}
          />
          <h1>{text}</h1>
        </div>
      </div>
    </div>
  );
};
