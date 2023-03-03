import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/ifb-logo.png";
import Sidebar from "../Sidebar/Sidebar";
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavOpen = () => setNavOpen(!navOpen);
  return (
    <>
      <nav className="navbar shadow sticky-top navbar-lg">
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="mx-3">
            <span
              onClick={handleNavOpen}
              className="fs-2 material-symbols-outlined pointer"
            >
              {navOpen ? "close" : "menu"}
            </span>
          </div>
          <div className="container-fluid w-100 d-flex align-items-center justify-content-center">
            <Link className="navbar-brand" to="/">
              <img width={100} src={Logo} alt="ifb-logo" />
            </Link>
          </div>
        </div>
      </nav>
      {navOpen ? <Sidebar /> : ""}
    </>
  );
};

export default Navbar;
