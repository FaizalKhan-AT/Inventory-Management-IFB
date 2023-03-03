import React from "react";

const Spinner = ({ height }) => {
  return (
    <div
      style={{ height: height ? height : "" }}
      className="d-flex justify-content-center my-4 align-items-center"
    >
      <div className="spinner-border text-danger " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
