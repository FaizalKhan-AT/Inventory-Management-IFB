import React from "react";
import { useNavigate } from "react-router-dom";

const FilterNav = ({
  search,
  setSearch,
  handleSearch,
  handleFilter,
  setFilter,
  tech,
  handleClearSales,
}) => {
  const categories = ["All", "Spares", "Addictives", "Accessories"];
  const navigate = useNavigate();
  const handleSearchInputChange = (e) => setSearch(e.target.value);
  const handleSelectChange = (e) => setFilter(e.target.value);
  return (
    <>
      <nav
        className={`d-flex my-3 align-items-center flex-wrap justify-content-${
          !tech ? "between" : "end"
        } container gap-3`}
      >
        {!tech ? (
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
        ) : (
          ""
        )}
        <div className="d-flex gap-3 flex-wrap align-items-center">
          {tech ? (
            <div
              onClick={handleClearSales}
              className="btn btn-success flex-wrap justify-content-center btn-rounded d-flex align-items-center"
            >
              <span className="material-symbols-outlined">clear</span>
              Clear sales
            </div>
          ) : (
            ""
          )}
          <div
            onClick={() => navigate(tech ? "/add-technician" : "/add-part")}
            className="btn btn-danger flex-wrap justify-content-center btn-rounded d-flex align-items-center"
          >
            <span className="material-symbols-outlined">add</span>
            Add {tech ? "Technician" : "Part"}
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
              <span className="material-symbols-outlined">search</span>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default FilterNav;
