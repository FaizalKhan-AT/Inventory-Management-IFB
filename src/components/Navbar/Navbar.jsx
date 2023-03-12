import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/ifb-logo.png";
import Sidebar from "../Sidebar/Sidebar";
const Navbar = ({ tech }) => {
  const links = [
    {
      to: "/admin/stocks",
      name: "Stocks",
      icon: "inventory_2",
    },
    {
      to: "/admin/technicians",
      name: "Technicians",
      icon: "tools_wrench",
    },
  ];
  const tlinks = [
    {
      to: "/technician",
      name: "Your Stocks",
      icon: "inventory_2",
    },
    {
      to: "/technician/inventory",
      name: "Inventory",
      icon: "tools_wrench",
    },
  ];
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
      {navOpen ? <Sidebar links={tech ? tlinks : links} /> : ""}
    </>
  );
};

export default Navbar;
