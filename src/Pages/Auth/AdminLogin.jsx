import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Auth/Login";
import Error from "../../components/Error/Error";
import { db } from "../../Firebase/config";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const adminRef = collection(db, "admins");
  const navigate = useNavigate();
  const handleLogin = (data) => {
    setLoading(true);
    const qu = query(adminRef, where("email", "==", data.email));
    getDocs(qu).then((snap) => {
      const [d] = snap.docs.map((doc) => {
        return { ...doc.data(), docid: doc.id };
      });
      if (d) {
        if (d.password === data.password) {
          const u = { username: d.username, email: d.email, id: d.docid };
          localStorage.setItem("admin", JSON.stringify(u));
          setLoading(false);
          navigate("/admin/stocks");
        } else {
          setLoading(false);
          setError("Invalid Password");
        }
      } else {
        setError("Email address doesn't exist");
        setLoading(false);
      }
    });
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <div
        style={{ height: "100vh" }}
        className="w-100 d-flex align-items-center justify-content-center"
      >
        <Login
          loading={loading}
          name="Admin Login"
          handleSubmit={handleLogin}
        />
      </div>
    </>
  );
};

export default AdminLogin;
