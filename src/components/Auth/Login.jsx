import React, { useState } from "react";

const Login = ({ name, loading, handleSubmit }) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendData = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };
  return (
    <>
      {" "}
      <div
        style={{
          minWidth: "310px",
          maxWidth: "320px",
          boxShadow: "var(--shadow)",
        }}
        className="card py-3 px-2"
      >
        <div
          style={{ textDecoration: "dotted underline var(--red-color)" }}
          className="text-center h4"
        >
          {name}
        </div>
        <br />
        <form className="w-100" onSubmit={sendData}>
          <div className="d-flex w-100 align-items-center flex-column gap-3">
            <div className="w-100 px-3">
              <label className="form-label d-flex align-items-center gap-2">
                <span className="fs-3 material-symbols-outlined ">
                  alternate_email
                </span>
                <span className="fs-5">Email</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.email}
                required
                type="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="w-100 px-3">
              <label className="form-label d-flex align-items-center gap-2">
                <span className="fs-3 material-symbols-outlined ">key</span>
                <span className="fs-5">Password</span>
              </label>
              <div className="position-relative">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control pe-5"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${
                    showPassword ? "text-danger" : ""
                  } position-absolute end-0 top-0 mt-2 me-2 material-symbols-outlined`}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>
            {error ? (
              <div
                className="alert alert-danger mt-2 position-relative"
                role="alert"
              >
                {error}
                <button
                  onClick={() => setError("")}
                  type="button"
                  className="btn-close position-absolute end-0 top-0 mt-1 me-2"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ) : (
              ""
            )}
            <div className="w-100 px-3 my-2">
              <button type="submit" className="w-100 btn btn-primary">
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
