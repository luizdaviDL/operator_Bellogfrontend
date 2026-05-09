import { useState } from "react";
import { Outlet } from "react-router-dom";

const NfeFlow = () => {
  const [faturamento, setFaturamento] = useState("");
  const [chegada, setChegada] = useState("");  
  const [files, setFiles] = useState([]);
  const [inputBuscaNfe, setInputBuscaNfe] = useState([]);

  return (
    <Outlet context={{
      faturamento,
      setFaturamento,
      chegada,
      setChegada,
      files,
      setFiles,      
      inputBuscaNfe, 
      setInputBuscaNfe
    }} />
  );
};

export default NfeFlow;