import { useState } from "react";

const TechnicianCard = ({ technician }) => {
  const [expand, setExpand] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="cursor">
        <div onClick={() => setExpand(!expand)} className="card py-2 px-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-1 mb-0">
                account_circle
              </span>
              <span className="h5 mb-0">{technician}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                className="btn btn-outline-dark btn-rounded"
                onClick={() => setExpand(!expand)}
              >
                {expand ? "less" : "more"}
              </div>
            </div>
          </div>
        </div>
        {expand ? (
          <div className="card expand py-2 px-3 mt-1">
            <div className="d-flex flex-column gap-2">
              <span className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5 card-ex-det">Email : </span>
                <span className="fw-bold red-color text-lowercase">
                  {technician}{" "}
                </span>
              </span>
              <span className="d-flex flex-column  gap-3">
                <span className="fw-bold fs-5 card-ex-det">
                  Stocks Assigned :{" "}
                </span>
                <table>
                  <tr>
                    <th>Part Name</th>
                    <th>Stocks</th>
                    <th>Sale</th>
                  </tr>
                  {[...Array(2)].map((_, idx) => (
                    <tr>
                      <td>{technician}</td>
                      <td>{technician}</td>
                      <td>{technician}</td>
                    </tr>
                  ))}
                </table>
              </span>
              <span className="d-flex flex-wrap align-items-center gap-3">
                <span className="fw-bold fs-5 card-ex-det">Password: </span>
                <input
                  className={`fw-bold ${
                    showPassword ? "red-color" : "text-dark"
                  } edit-pass`}
                  value={technician}
                  type={showPassword ? "text" : "password"}
                  readOnly
                />
              </span>
              <label
                style={{ userSelect: "none" }}
                className="d-flex align-items-center gap-2"
              >
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span>show password</span>
              </label>
            </div>

            <div className="d-flex align-items-center gap-3 justify-content-center mb-2">
              <div className="btn btn-outline-secondary btn-rounded">
                Revoke Stocks
              </div>
              <div className="btn btn-outline-danger btn-rounded">Delete</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TechnicianCard;
