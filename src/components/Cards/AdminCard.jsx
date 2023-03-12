import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase/config";
import Error from "../Error/Error";
import DeleteModal from "../Modals/DeleteModal";

const AdminCard = ({ admin, fetchData }) => {
  const [expand, setExpand] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => setOpen(!open);
  const handleDelete = (id) => {
    const docRef = doc(db, "admins", id);
    deleteDoc(docRef)
      .then(() => {
        setOpen(false);
        setError("Admin removed successfully");
        fetchData();
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        deleteFn={handleDelete}
        docId={admin.docid}
        data={admin.username}
      />

      {error ? <Error setError={setError} error={error} /> : ""}

      <div className="pointer">
        <div onClick={() => setExpand(!expand)} className="card py-2 px-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-1 mb-0">
                account_circle
              </span>
              <span className="h5 mb-0">{admin.username}</span>
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
                  {admin.email}
                </span>
              </span>

              <span className="d-flex flex-wrap align-items-center gap-3">
                <span className="fw-bold fs-5 card-ex-det">Password: </span>
                <input
                  className={`fw-bold ${
                    showPassword ? "red-color" : "text-dark"
                  } edit-pass`}
                  value={admin.password}
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

export default AdminCard;
