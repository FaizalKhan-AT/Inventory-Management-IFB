import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <>
      <div className="position-fixed start-0 shadow bottom-0 sidebar bg-dark">
        {links.map((link, idx) => {
          return (
            <Link
              key={link + idx}
              to={link.to}
              className="side-link w-100  d-flex align-items-center gap-3 text-light text-decoration-none p-3 py-4 justify-content-center"
            >
              <span className="material-symbols-outlined fs-3">
                {link.icon}
              </span>
              <span className="text-uppercase fw-bold">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
