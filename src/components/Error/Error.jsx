import React from "react";

const Error = ({ error, setError }) => {
  return (
    <div
      style={{ zIndex: "22", width: "fit-content" }}
      className="alert alert-danger  mt-2 position-fixed end-0 bottom-0 me-3 mb-4"
      role="alert"
    >
      <button
        onClick={() => setError("")}
        type="button"
        className="btn-close position-absolute end-0 top-0 mt-1 me-2"
      ></button>
      <span className="py-2">{error}</span>
    </div>
  );
};

export default Error;
