import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../contexts/AuthContext";
import Avatar from "../Avatar/Avatar";

const Sidebar = ({ links, type }) => {
  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem(
        type === "admin" ? "admin" : type === "user" ? "user" : "sadmin"
      )
    )
  );
  const { handleLogout } = useContext(Auth);
  return (
    <>
      <div className="position-fixed start-0 shadow bottom-0 sidebar bg-dark">
        <Avatar user={user} />
        {links !== ""
          ? links.map((link, idx) => {
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
            })
          : ""}
        <div className="d-flex justify-content-center my-2 mt-4">
          <button
            title="Logout"
            onClick={() =>
              type === "admin"
                ? handleLogout("admin")
                : type === "user"
                ? handleLogout("user")
                : handleLogout("sadmin")
            }
            className="btn btn-secondary logout d-flex align-items-center justify-content-center btn-rounded"
          >
            <span className="material-symbols-outlined ms-1">logout</span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
