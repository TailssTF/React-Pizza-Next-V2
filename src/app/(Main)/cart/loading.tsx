"use client";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="modal-backdrop">
      <RotatingLines
        visible={true}
        width="96"
        strokeColor="#fe5f1e"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loading;
