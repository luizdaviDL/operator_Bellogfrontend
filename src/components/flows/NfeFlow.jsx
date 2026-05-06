import { useState } from "react";
import { Outlet } from "react-router-dom";

const NfeFlow = () => {
  const [faturamento, setFaturamento] = useState("");
  const [chegada, setChegada] = useState("");
  const [embarque, setEmbarque] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <Outlet context={{
      faturamento,
      setFaturamento,
      chegada,
      setChegada,
      files,
      setFiles,
      embarque,
      setEmbarque
    }} />
  );
};

export default NfeFlow;