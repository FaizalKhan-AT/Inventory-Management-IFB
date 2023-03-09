import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/config";

const AssignModal = ({ open, handleOpen, assignFn, data, loading }) => {
  const [users, setUsers] = useState([]);
  const techRef = collection(db, "technicians");
  const [formData, setFormData] = useState({});
  const fetchData = () => {
    getDocs(techRef)
      .then((snap) => {
        setUsers(
          snap.docs.map((post) => {
            return { ...post.data(), docid: post.id };
          })
        );
      })
      .catch((err) => console.error(err.message));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
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
              Assign Stocks
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
              name="technician"
              className="form-select"
              onChange={handleChange}
            >
              <option selected disabled>
                --Select a technician--
              </option>
              {users.map((op, idx) => {
                return (
                  <option value={op.docid} key={op.docid}>
                    {op.username}
                  </option>
                );
              })}
            </select>
            <div className="my-3 w-100">
              <label className="form-label">How many to assign</label>
              <input
                onChange={handleChange}
                name="stockAmount"
                value={formData.stockAmount}
                maxLength={200}
                type="number"
                placeholder={data.stock + " stocks available"}
                className="form-control"
              />
            </div>
            <button
              onClick={() => assignFn(data, formData)}
              className="btn btn-outline-primary btn-rounded"
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <>Assign</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
