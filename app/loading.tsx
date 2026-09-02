import React from "react";

const Loading = () => {
  return (
    <span className="font-audiowide flex h-screen w-full flex-row items-center justify-center gap-4 text-lg font-semibold">
      <div className="loading loading-spinner"></div> LOADING
    </span>
  );
};

export default Loading;
