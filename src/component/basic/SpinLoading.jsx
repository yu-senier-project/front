import React from "react";
import { SyncLoader } from "react-spinners";

export const SpinLoading = ({ size }) => {
  return (
    <div>
      <SyncLoader color="#36b4d6" size={size} />
    </div>
  );
};
