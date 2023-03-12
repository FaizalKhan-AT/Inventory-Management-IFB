import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNav = ({ search, setSearch, handleSearch, tech }) => {
  const navigate = useNavigate();
  const handleSearchInputChange = (e) => setSearch(e.target.value);

  return (
    <nav className="d-flex my-3 align-items-center flex-wrap justify-content-end container gap-3">
      <div className="d-flex gap-3 flex-wrap align-items-center">
        {tech ? (
          ""
        ) : (
          <div
            onClick={() => navigate("/admin/add-admin")}
            className="btn btn-danger flex-wrap justify-content-center btn-rounded d-flex align-items-center"
          >
            <span className="material-symbols-outlined">add</span>
            Add Admin
          </div>
        )}
        <div className="d-flex align-items-center gap-2">
          <input
            type="search"
            onChange={handleSearchInputChange}
            placeholder="Search"
            className="form-control"
            value={search}
          />
          <span
            onClick={handleSearch}
            className="btn btn-rounded btn-dark d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined">search</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
