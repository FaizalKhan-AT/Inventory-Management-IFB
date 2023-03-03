import React from "react";
import logo from "../../assets/IFB.png";
const Footer = () => {
  return (
    <div className="w-100 bg-dark px-3 py-4">
      <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
        <div style={{ width: "80px" }} className="bg-light pointer btn-rounded">
          <img width={80} src={logo} alt="ifb-logo" />
        </div>
        <span className="text-light fs-5">
          All rights reserved &copy; {new Date().getFullYear()} | IFB service
        </span>
        <div className="text-light">
          Developed by{" "}
          <a
            className="dev-link"
            href="https://faizalkhan-at.github.io/animated-porfolio-angular/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @al techie
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
