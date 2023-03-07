import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../components/Auth/Signup";
import Error from "../components/Error/Error";
import { db } from "../Firebase/config";
const AddTechnician = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ref = collection(db, "technicians");
  const validate = (data) => {
    setLoading(true);
    const qu = query(ref, where("email", "==", data.email));
    getDocs(qu).then((snap) => {
      const [d] = snap.docs.map((doc) => doc.data());
      if (d) {
        setError("Email Id already Exists ");
        setLoading(false);
        return;
      } else {
        uploadToFireStore(data);
      }
    });
  };

  const handleSubmit = (data) => validate(data);

  const uploadToFireStore = async (data) => {
    addDoc(collection(db, "technicians"), data)
      .then(() => {
        setLoading(false);
        navigate("/technicians");
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <div
        style={{ height: "100vh" }}
        className="w-100 d-flex align-items-center justify-content-center"
      >
        <Signup
          loading={loading}
          name="Add New Technician"
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default AddTechnician;
