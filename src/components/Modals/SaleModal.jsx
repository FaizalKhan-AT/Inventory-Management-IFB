import { useEffect, useState } from "react";

const SaleModal = ({ open, handleOpen, data, saleFn, loading, users }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
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
                Mark Sale
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
                name="tid"
                className="form-select"
                onChange={handleChange}
              >
                <option selected disabled>
                  --Select a technician--
                </option>
                {users.length > 0 ? (
                  users.map((op, idx) => {
                    return (
                      <option value={op.docid} key={op.docid}>
                        {op.username}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>
                    {loading ? "Loading..." : "No techincians"}
                  </option>
                )}
              </select>
              <div className="my-3 w-100">
                <label className="form-label">How many sold</label>
                <input
                  onChange={handleChange}
                  name="stockSold"
                  value={formData.stockSold}
                  maxLength={200}
                  type="number"
                  min="0"
                  className="form-control"
                />
              </div>
              <button
                disabled={formData.stockSold ? false : true}
                onClick={() => saleFn(formData)}
                className="btn btn-outline-primary btn-rounded"
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>Mark as sold</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleModal;
