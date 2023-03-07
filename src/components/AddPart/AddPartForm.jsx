import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartEdit } from "../../contexts/EditContext";
import { db } from "../../Firebase/config";
import Error from "../Error/Error";

const AddPartForm = ({ edit }) => {
  const { part } = useContext(PartEdit);
  const [formData, setFormData] = useState(edit ? part : {});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = ["spares", "addictives", "accessories"];
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = () => {
    if (formData.partName.length < 4) {
      setError("Part name must have more than 3 letters...");
      return false;
    }
    if (!formData.category) {
      setError("Please select a category...");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setError("");
      if (edit) updateDocument(formData);
      else uploadToFireStore(formData);
    }
  };
  const updateDocument = (data) => {
    const upRef = doc(db, "parts", part.docid);
    updateDoc(upRef, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };
  const uploadToFireStore = (data) => {
    addDoc(collection(db, "parts"), data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <form className="row w-100" onSubmit={handleSubmit}>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Part name
            <span className="text-danger">*</span>
          </label>
          <input
            onChange={handleChange}
            name="partName"
            value={formData.partName}
            maxLength={200}
            type="text"
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Stock available
            <span className="text-danger">*</span>
          </label>
          <input
            onChange={handleChange}
            name="stock"
            value={formData.stock}
            maxLength={200}
            type="number"
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Category
            <span className="text-danger">*</span>
          </label>
          <select
            name="category"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option selected={edit ? false : true} disabled>
              --Select a category--
            </option>
            {categories.map((op, idx) => {
              return (
                <option value={op} key={op + idx}>
                  {op}
                </option>
              );
            })}
          </select>
        </div>
        {formData.category === "spares" ? (
          <div className="col-md-6 my-2">
            <label className="form-label">
              Part code
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange}
              name="partCode"
              value={formData.partCode}
              maxLength={200}
              type="text"
              required
              className="form-control"
            />
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="col-md-6 btn btn-primary">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <>{edit ? "Edit part" : "Add part"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPartForm;
