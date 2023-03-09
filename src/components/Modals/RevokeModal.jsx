import React, { useState } from "react";
import Error from "../Error/Error";

const RevokeModal = ({ open, handleOpen, data, revokeFn, id, loading }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}

      <div
        style={{ zIndex: "20" }}
        className={`position-absolute modal-share ${open ? "active" : ""}`}
      >
        <div
          onClick={handleOpen}
          style={{ backdropFilter: "blur(3px)" }}
          className="overlay  position-fixed start-0 end-0 bottom-0 top-0"
        ></div>
        <div
          style={{ zIndex: "20", width: "40%" }}
          className="card position-fixed modal-size px-3 py-4 start-50 top-50 translate-middle"
        >
          <div>
            <div className="d-flex gap-2 h4 align-items-center justify-content-between">
              <div className="d-flex gap-2 h4 align-items-center">
                <span className="material-symbols-outlined text-dark">
                  inventory
                </span>
                Revoke Stocks
              </div>
              <span
                onClick={handleOpen}
                className="material-symbols-outlined fs-3 pointer"
              >
                close
              </span>
            </div>
          </div>
          <div className="my-3 mx-1">
            <div className="d-flex align-items-center flex-column">
              <select
                name="stockId"
                className="form-select"
                onChange={handleChange}
              >
                <option selected disabled>
                  --Select a stock--
                </option>
                {data.map((op, idx) => {
                  return (
                    <option value={op.docid} key={op.docid}>
                      {op.partName}
                    </option>
                  );
                })}
              </select>
              <div className="my-3 w-100">
                <label className="form-label">How many to revoke</label>
                <input
                  onChange={handleChange}
                  name="stockReduce"
                  value={formData.stockReduce}
                  maxLength={200}
                  type="number"
                  className="form-control"
                />
              </div>
              <button
                onClick={() => revokeFn({ tid: id, ...formData })}
                className="btn btn-outline-primary btn-rounded"
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>Revoke</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevokeModal;
