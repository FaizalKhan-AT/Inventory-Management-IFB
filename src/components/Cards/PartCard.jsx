import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartEdit } from "../../contexts/EditContext";
import { db } from "../../Firebase/config";
import Error from "../Error/Error";
import AssignModal from "../Modals/AssignModal";
import DeleteModal from "../Modals/DeleteModal";

const PartCard = ({ data, fetchData }) => {
  const navigate = useNavigate();
  const { setPart } = useContext(PartEdit);
  const [open, setOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => setOpen(!open);
  const handleDelete = (id) => {
    const docRef = doc(db, "parts", id);
    deleteDoc(docRef)
      .then(() => {
        setOpen(false);
        setError("Part deleted successfully");
        fetchData();
      })
      .catch((err) => setError(err.message));
  };
  const handleAssignOpen = () => setAssignOpen(!assignOpen);
  const handleAssign = (data, form) => {
    setLoading(true);
    const upRef = doc(db, "parts", data.docid);
    const userRef = doc(db, "technicians", form.technician);
    const d = { ...data, stock: +data.stock - +form.stockAmount };
    updateDoc(upRef, d)
      .then(() => {
        getDoc(userRef).then((snap) => {
          let s;
          if (snap.data().stocks && snap.data().stocks.length > 0) {
            const [f] = snap
              .data()
              .stocks.filter((item) => item.docid === data.docid);
            if (f) {
              const r = snap
                .data()
                .stocks.filter((item) => item.docid !== data.docid);
              s = {
                stocks: [
                  ...r,
                  { ...f, stockAmount: +f.stockAmount + +form.stockAmount },
                ],
              };
            } else {
              s = {
                stocks: [...snap.data().stocks, { ...data, ...form }],
              };
            }
          } else s = { stocks: [{ ...data, ...form }] };

          updateDoc(userRef, s).then(() => {
            setLoading(false);
            handleAssignOpen();
            setError("stock assigned");
            fetchData();
          });
        });
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        deleteFn={handleDelete}
        docId={data.docid}
        data={data.partName}
      />
      <AssignModal
        handleOpen={handleAssignOpen}
        open={assignOpen}
        data={data}
        loading={loading}
        assignFn={handleAssign}
      />
      <div className="col-md-5 pointer card part px-2 py-3 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center flex-column gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Part name : </span>
            <span className="fw-">{data.partName}</span>
          </div>
          {data.category === "spares" ? (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">Part code : </span>
              <span className="fw-">{data.partCode}</span>
            </div>
          ) : (
            ""
          )}
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">In Stock : </span>
            <span className="fw-">{data.stock}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Category : </span>
            <span className="fw-">{data.category}</span>
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap px-3 my-2 justify-content-center w-100">
          <div
            onClick={() => {
              setPart(data);
              navigate("/edit-part");
            }}
            className="btn d-flex align-items-center justify-content-center my-2 btn-outline-primary"
          >
            <span className="material-symbols-outlined">edit_square</span>
          </div>
          <div
            onClick={handleOpen}
            className="btn d-flex align-items-center justify-content-center my-2 btn-outline-danger"
          >
            <span className="material-symbols-outlined">delete</span>
          </div>

          <div
            onClick={handleAssignOpen}
            className="btn my-2 btn-outline-success"
          >
            Assign stock
          </div>
        </div>
      </div>
    </>
  );
};

export default PartCard;
