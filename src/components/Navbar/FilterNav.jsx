import React from "react";
import { useNavigate } from "react-router-dom";

const FilterNav = ({
  search,
  setSearch,
  handleSearch,
  handleFilter,
  setFilter,
}) => {
  const categories = ["All", "Spares", "Addictives", "Accessories"];
  const navigate = useNavigate();
  const handleSearchInputChange = (e) => setSearch(e.target.value);
  const handleSelectChange = (e) => setFilter(e.target.value);
  return (
    <>
      <nav className="d-flex my-3 align-items-center flex-wrap justify-content-between container gap-3">
        <div className="d-flex align-items-center gap-3">
          <select
            onChange={handleSelectChange}
            className="form-select"
            name="category"
          >
            {categories.map((item, idx) => {
              return (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <div
            onClick={handleFilter}
            className="btn btn-dark btn-rounded d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined">filter_alt</span>
            <span>Filter</span>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <div
            onClick={() => navigate("/add-part")}
            className="btn btn-danger flex-wrap justify-content-center btn-rounded d-flex align-items-center"
          >
            <span className="material-symbols-outlined search">add</span>
            Add Part
          </div>
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
              <span className="material-symbols-outlined search">search</span>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default FilterNav;
