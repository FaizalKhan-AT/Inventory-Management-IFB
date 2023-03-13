import React from "react";

const Avatar = ({ user }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center p-3 gap-2 mx-3 text-light">
        <span className="material-symbols-outlined fs-1 mb-0 acc">
          account_circle
        </span>
        <div style={{ fontSize: "19px" }} className="d-flex flex-column">
          <span>Welcome,</span>
          <span className="fw-bold text-danger text-capitalize">
            {user.username}
          </span>
        </div>
      </div>
    </>
  );
};

export default Avatar;
