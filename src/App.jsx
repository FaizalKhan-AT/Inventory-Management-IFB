import { Routes, Route } from "react-router-dom";
import AddPart from "./Pages/AddPart";
import AddTechnician from "./Pages/AddTechnician";
import EditPart from "./Pages/EditPart";
import Home from "./Pages/Home";
import Technicians from "./Pages/Technicians";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technicians" element={<Technicians />} />
        <Route path="/add-technician" element={<AddTechnician />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/edit-part" element={<EditPart />} />
      </Routes>
    </>
  );
}

export default App;
