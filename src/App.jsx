import { Routes, Route } from "react-router-dom";
import AddPart from "./Pages/AddPart";
import EditPart from "./Pages/EditPart";
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/edit-part" element={<EditPart />} />
      </Routes>
    </>
  );
}

export default App;
