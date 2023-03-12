import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const routes = [
    {
      name: "admin",
      path: localStorage.getItem("admin") ? "/admin/stocks" : "/admin/login",
    },
    {
      name: "technician",
      path: localStorage.getItem("user") ? "/technician/" : "/technician/login",
    },
    {
      name: "super admin",
      path: localStorage.getItem("sadmin")
        ? "/super-admin/"
        : "/super-admin/login",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column container justify-content-center mt-4">
      <div
        style={{ textDecoration: "dotted underline red" }}
        className="text-center h2 fw-bold my-3 mt-5"
      >
        Choose your designation
      </div>
      <div className="card p-4 d-flex align-items-center flex-column gap-3">
        {routes.map((route, idx) => {
          return (
            <div
              onClick={() => navigate(route.path)}
              key={route.name + idx}
              className="btn btn-primary text-capitalize w-100"
            >
              {route.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
