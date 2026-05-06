import React, { useState } from 'react';
import ConfirmButton from '../../components/buttons/ConfirmButton';
import { useNavigate, useOutletContext } from "react-router-dom";
import Service from '../service/Service';
import Processing from '../../components/alerts/Processing';
import Success from '../../components/alerts/Success';
import ErrorAlert from '../../components/alerts/Error'; // 🔥 renomeei pra evitar conflito
import Functions from '../functions js/FunctionsJS';


const DateInputs = ({ props, type }) => {
  const service = new Service();
  const functions = new Functions();


  const navigate = useNavigate();

  const [dateV, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // 🔥 agora guarda mensagem


  const {
    faturamento,
    chegada,
    files,
    setFiles,
    setFaturamento,
    setChegada
  } = useOutletContext();

  const handleClick = async () => {

    // 🔹 PASSO 1
    if (type=="faturamento") {
      setFaturamento(dateV);
      navigate("/chegada");
      return;
    }

    // 🔹 PASSO 2
    setChegada(dateV);

    const payload = {
      faturamento,
      chegada:dateV,
      files,
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await service.nfe_service(payload)
      
      if (!result.ok) {
        setError(result.status);
        return;
      }            
      setSuccess(result.status);


    } catch (err) {
      console.error("Erro inesperado:", err);
      setError("Erro inesperado ao enviar dados");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10
    },

    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      paddingTop: "40px",
      zIndex: 999
    },

    modal: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      width: "320px",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      zIndex: 20
    },

    label: {
      display: "block",
      marginBottom: "10px",
      fontSize: "14px",
      color: "#333"
    },

    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px"
    }
  };

  return (
    <div style={styles.overlay}>

      {/* 🔥 LOADING */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <Processing text="Processando dados..." />
        </div>
      )}

      {/* 🔥 ERRO */}
      {error && (
        <div style={styles.loadingOverlay}>
          <ErrorAlert text={error} onClose={() => setError(null)} />
        </div>
      )}

      {/* 🔥 SUCESSO */}
      {success && (
        <div style={styles.loadingOverlay}>
          <Success text={success}/>
        </div>
      )}

      <div style={styles.modal}>
        <label style={styles.label}>
          {props}
        </label>

        <input
          type="date"
          value={dateV}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <ConfirmButton 
          visible={dateV !== ""} 
          onClick={handleClick}
        />
      </div>

    </div>
  );
};

export default DateInputs;