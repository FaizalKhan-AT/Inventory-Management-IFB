import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/config";

export const Auth = createContext(null);

const AuthContext = ({ children }) => {
  const [technician, setTechnician] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = (role, mail) => {
    const ref = collection(db, role);
    const qu = query(ref, where("email", "==", mail));
    getDocs(qu).then((snap) => {
      const [d] = snap.docs.map((doc) => doc.data());
      if (d) return;
      else {
        switch (role) {
          case "technicians":
            handleLogout("user");
            break;
          case "admins":
            handleLogout("admin");
            break;
          case "sadmin":
            handleLogout("sadmin");
            break;
        }
      }
    });
  };
  const checkAuth = () => {
    if (window.location.href.includes("/technician")) {
      if (!localStorage.getItem("user")) {
        navigate("/technician/login");
      } else {
        const { email } = JSON.parse(localStorage.getItem("user"));
        isAuthenticated("technicians", email);
      }
    }
    if (window.location.href.includes("/admin")) {
      if (!localStorage.getItem("admin")) {
        navigate("/admin/login");
      } else {
        const { email } = JSON.parse(localStorage.getItem("admin"));
        isAuthenticated("admins", email);
      }
    }
    if (window.location.href.includes("/super-admin")) {
      if (!localStorage.getItem("sadmin")) {
        navigate("/super-admin/login");
      } else {
        const { email } = JSON.parse(localStorage.getItem("sadmin"));
        isAuthenticated("sadmin", email);
      }
    }
  };
  const handleLogout = (u) => {
    switch (u) {
      case "user":
        localStorage.removeItem("user");
        navigate("/technician/login");
        break;
      case "sadmin":
        localStorage.removeItem("sadmin");
        navigate("/super-admin/login");
        break;
      case "admin":
        localStorage.removeItem("admin");
        navigate("/admin/login");
        break;
    }
  };
  useEffect(() => {
    checkAuth();
  }, [window.location.href]);
  return <Auth.Provider value={{ handleLogout }}>{children}</Auth.Provider>;
};

export default AuthContext;
