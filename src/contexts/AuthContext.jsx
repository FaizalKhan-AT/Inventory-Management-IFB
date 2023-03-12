import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = createContext(null);

const AuthContext = ({ children }) => {
  const [technician, setTechnician] = useState(null);
  const navigate = useNavigate();
  const checkAuth = () => {
    if (window.location.href.includes("/technician")) {
      if (!localStorage.getItem("user")) {
        navigate("/technician/login");
      } else setTechnician(JSON.parse(localStorage.getItem("user")));
    }
    if (window.location.href.includes("/admin")) {
      if (!localStorage.getItem("admin")) {
        navigate("/admin/login");
      }
    }
    if (window.location.href.includes("/super-admin")) {
      if (!localStorage.getItem("sadmin")) {
        navigate("/super-admin/login");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Auth.Provider value={{ technician, setTechnician }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;
