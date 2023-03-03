import { createContext, useState } from "react";

export const PartEdit = createContext(null);

const EditContext = ({ children }) => {
  const [part, setPart] = useState({});
  return (
    <PartEdit.Provider value={{ part, setPart }}>{children}</PartEdit.Provider>
  );
};

export default EditContext;
