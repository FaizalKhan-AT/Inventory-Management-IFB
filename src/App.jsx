import { Routes, Route, Link } from "react-router-dom";
import AddPart from "./Pages/AddPart";
import AddTechnician from "./Pages/AddTechnician";
import Admin from "./Pages/Admin";
import AddAdmin from "./Pages/Auth/AddAdmin";
import AdminLogin from "./Pages/Auth/AdminLogin";
import SuperLogin from "./Pages/Auth/SuperLogin";
import TechnicianLogin from "./Pages/Auth/TechnicianLogin";
import EditPart from "./Pages/EditPart";
import Home from "./Pages/Home";
import Inventory from "./Pages/Inventory";
import Stocks from "./Pages/Stocks";
import Technician from "./Pages/Technician";
import Technicians from "./Pages/Technicians";
import TableView from "./Pages/TableView";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin">
          <Route path="stocks" element={<Stocks />} />
          <Route path="technicians" element={<Technicians />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="table-view" element={<TableView />} />
        </Route>
        <Route path="/technician">
          <Route index element={<Technician />} />
          <Route path="login" element={<TechnicianLogin />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
        <Route path="/super-admin">
          <Route index element={<Admin />} />
          <Route path="login" element={<SuperLogin />} />
          <Route path="add-admin" element={<AddAdmin />} />
        </Route>
        <Route path="/add-technician" element={<AddTechnician />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/edit-part" element={<EditPart />} />
        <Route
          path="*"
          element={
            <h2 className="text-center mt-5">
              404 Page not found. Requested page Doesn't Exist{" "}
              <Link to="/">Home</Link>
            </h2>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
