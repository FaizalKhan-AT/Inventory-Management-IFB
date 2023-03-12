import React from "react";
import { useNavigate } from "react-router-dom";
import AddPartForm from "../components/AddPart/AddPartForm";

const AddPart = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div
          onClick={() => navigate("/admin/stocks")}
          className="position-fixed top-0 start-0 mt-3 ms-3 d-flex align-items-center justify-content-center btn btn-rounded btn-dark"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <span>Go back</span>
        </div>
        <div
          style={{ textDecoration: "dotted underline red" }}
          className="text-center h3 fw-bold my-3 mt-5"
        >
          Add New Part
        </div>
        <br />
        <AddPartForm />
      </div>
    </>
  );
};

export default AddPart;
