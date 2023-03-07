import { useState } from "react";
import TechnicianCard from "../components/Cards/TechnicianCard";
import Error from "../components/Error/Error";
import FilterNav from "../components/Navbar/FilterNav";
import Navbar from "../components/Navbar/Navbar";

const Technicians = () => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const handleSearch = () => console.log("searching");
  return (
    <>
      <Navbar />
      {error ? <Error setError={setError} error={error} /> : ""}
      <br />
      <div
        style={{ textDecoration: "dotted underline red" }}
        className="text-center h2 fw-bold my-3 mt-5"
      >
        Technicians
      </div>
      <br />
      <FilterNav
        tech
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      <br />
      <br />
      <div className="container d-flex flex-column gap-2">
        {[...Array(5)].map((_, idx) => {
          return (
            <TechnicianCard
              key={idx * idx + idx}
              technician={"technician-" + idx}
            />
          );
        })}
      </div>
    </>
  );
};

export default Technicians;
