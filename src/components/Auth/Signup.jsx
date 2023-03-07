import { useState } from "react";
import Error from "../Error/Error";
import { validateEmail, validatePassword } from "./Validate";
const Signup = ({ name, handleSubmit, loading }) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateData = () => {
    if (!validatePassword(formData.password))
      return "Password must contain atleast 8 characters, must include special character, upper and lowercase characters, numbers to make password strong";
    if (!validateEmail(formData.email))
      return "Entered email address is not valid";
    return "true";
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const err = validateData();
    setError(err);
    if (err !== "true") return;
    setError("");
    handleSubmit(formData);
  };
  return (
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
      <form className="w-100" onSubmit={onFormSubmit}>
        <div className="d-flex w-100 align-items-center flex-column gap-3">
          <div className="w-100 px-3">
            <label className="form-label d-flex align-items-center gap-2">
              <span className="fs-3 material-symbols-outlined">
                account_circle
              </span>
              <span className="fs-5">Username</span>
            </label>
            <input
              onChange={handleChange}
              value={formData.username}
              required
              type="text"
              name="username"
              className="form-control"
            />
          </div>
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
                } position-absolute end-0 pointer top-0 mt-2 me-2 material-symbols-outlined`}
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
              <button
                onClick={() => setError("")}
                type="button"
                className="btn-close position-absolute end-0 top-0 mt-1 me-2"
              ></button>
              <span className="py-2">{error}</span>
            </div>
          ) : (
            ""
          )}
          <div className="w-100 px-3 mb-2">
            <button type="submit" className="w-100 btn btn-primary">
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <>Add</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
