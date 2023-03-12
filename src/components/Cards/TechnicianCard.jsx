import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase/config";
import Error from "../Error/Error";
import DeleteModal from "../Modals/DeleteModal";
import RevokeModal from "../Modals/RevokeModal";

const TechnicianCard = ({ technician, fetchData }) => {
  const [expand, setExpand] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openRevoke, setOpenRevoke] = useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => setOpen(!open);
  const handleRevokeOpen = () => setOpenRevoke(!openRevoke);
  const handleDelete = (id) => {
    const docRef = doc(db, "technicians", id);
    deleteDoc(docRef)
      .then(() => {
        setOpen(false);
        setError("Technician removed successfully");
        fetchData();
      })
      .catch((err) => setError(err.message));
  };
  const handleRevoke = (data) => {
    setLoading(true);
    const docRef = doc(db, "technicians", data.tid);
    if (
      +technician.stocks.find((item) => item.docid === data.stockId)
        .stockAmount < +data.stockReduce
    ) {
      setLoading(false);
      setError("stock revoke is higher than stock assigned");
      return;
    }
    if (+data.stockReduce < 0) {
      setLoading(false);
      setError("stock revoke cannot be negative");
      return;
    }
    setError("");
    const d = technician.stocks.map((item) => {
      if (item.docid === data.stockId) {
        return {
          ...item,
          stockAmount: +item.stockAmount - +data.stockReduce,
        };
      } else return item;
    });
    const s = d.filter((item) => item.stockAmount > 0);

    const up = { stocks: [...s] };
    updateDoc(docRef, up)
      .then(() => {
        const stockRef = doc(db, "parts", data.stockId);
        const sinc = updateDoc(stockRef, {
          stock: increment(+data.stockReduce),
        }).then(() => {
          setLoading(false);
          setError("Revoked stocks");
          handleRevokeOpen();
          fetchData();
        });
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        deleteFn={handleDelete}
        docId={technician.docid}
        data={technician.username}
      />
      <RevokeModal
        open={openRevoke}
        handleOpen={handleRevokeOpen}
        data={technician.stocks}
        id={technician.docid}
        revokeFn={handleRevoke}
        loading={loading}
      />
      {error ? <Error setError={setError} error={error} /> : ""}

      <div className="pointer">
        <div onClick={() => setExpand(!expand)} className="card py-2 px-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-1 mb-0">
                account_circle
              </span>
              <span className="h5 mb-0">{technician.username}</span>
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
                  {technician.email}
                </span>
              </span>
              {technician.stocks && technician.stocks.length > 0 ? (
                <span className="d-flex flex-column  gap-3">
                  <span className="fw-bold fs-5 card-ex-det">
                    Stocks Assigned :{" "}
                  </span>
                  <table>
                    <thead>
                      <tr>
                        <th>Part Name</th>
                        <th>Stocks</th>
                        <th>Sale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technician.stocks.map((item, idx) => (
                        <tr key={item.docid}>
                          <td>{item.partName}</td>
                          <td>{item.stockAmount}</td>
                          <td>{item.sale ? item.sale : 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </span>
              ) : (
                ""
              )}
              <span className="d-flex flex-wrap align-items-center gap-3">
                <span className="fw-bold fs-5 card-ex-det">Password: </span>
                <input
                  className={`fw-bold ${
                    showPassword ? "red-color" : "text-dark"
                  } edit-pass`}
                  value={technician.password}
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

            <div className="my-3 d-flex align-items-center gap-3 justify-content-center mb-2">
              {technician.stocks && technician.stocks.length > 0 ? (
                <div
                  onClick={handleRevokeOpen}
                  className="btn btn-outline-secondary btn-rounded"
                >
                  Revoke Stocks
                </div>
              ) : (
                ""
              )}
              <div
                onClick={handleOpen}
                className="btn btn-outline-danger btn-rounded"
              >
                Delete
              </div>
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
