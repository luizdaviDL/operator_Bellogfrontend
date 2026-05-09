import React, { useState } from 'react';
import ConfirmButton from '../../components/buttons/ConfirmButton';
import { useOutletContext } from "react-router-dom";
import Service from '../service/Service';
import Processing from '../../components/alerts/Processing';
import Success from '../../components/alerts/Success';
import ErrorAlert from '../../components/alerts/Error';

const FilterTipeShearch = () => {

  const [filterType, setFilterType] = useState("");
  const [value, setValue] = useState("");

  // 🔥 status UI
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);  
  const service = new Service();
  let typeShearch = null;

  const {
    files,
    embarque,
    inputBuscaNfe,    
    setInputBuscaNfe
  } = useOutletContext();

  // 🔥 regras dinâmicas
  const maxLength =
    filterType === "nota_fiscal"
      ? 5
      : filterType === "embarque"
      ? 10
      : 0;

  const placeholder =
    filterType === "nota_fiscal"
      ? "Ex: 79567"
      : filterType === "embarque"
      ? "Ex: 5017702481"
      : "";

  const handleClick = async () => {
      const payload = {
          files: files // Adiciona os files ao payload
      };

      if (filterType === "nota_fiscal") {
        setInputBuscaNfe(value);
        payload.inputBuscaNfe = value; 
        typeShearch = "nota_fiscal";
      }

      if (filterType === "embarque") {
        setInputBuscaNfe(value);
        payload.inputBuscaNfe = value;
        typeShearch = "embarque";
      }

     
    try {

      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await service.buscar_nfe(payload,typeShearch)

      if (!result.ok) {
        setError(result.status);
        return;
      }            
      setSuccess(result.status);

    } catch (err) {

      console.error("Erro inesperado:", err);


    } finally {

      setLoading(false);

    }
  }

  // 🔥 apenas números
  const handleChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    setValue(onlyNumbers.slice(0, maxLength));
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
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    },

    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#333"
    },

    select: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #dcdcdc",
      outline: "none",
      fontSize: "14px",
      background: "#fff"
    },

    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #dcdcdc",
      outline: "none",
      fontSize: "14px",
      boxSizing: "border-box"
    },

    helper: {
      fontSize: "12px",
      color: "#777",
      marginTop: "6px"
    }
  };

  return (
    <div style={styles.overlay}>

      {/* 🔥 PROCESSANDO */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <Processing text="Processando busca..." />
        </div>
      )}

      {/* 🔥 ERRO */}
      {error && (
        <div style={styles.loadingOverlay}>
          <ErrorAlert
            text={error}
            onClose={() => setError(null)}
          />
        </div>
      )}

      {/* 🔥 SUCESSO */}
      {success && (
        <div style={styles.loadingOverlay}>
          <Success text={success} />
        </div>
      )}

      <div style={styles.modal}>

        {/* 🔥 SELECT */}
        <div>
          <label style={styles.label}>
            Tipo de busca
          </label>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setValue("");
            }}
            style={styles.select}
          >
            <option value="">
              Selecione...
            </option>

            <option value="embarque">
              Número de embarque
            </option>

            <option value="nota_fiscal">
              Número da nota fiscal
            </option>
          </select>
        </div>

        {/* 🔥 INPUT */}
        {filterType && (
          <div>
            <label style={styles.label}>
              Digite o valor
            </label>

            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              style={styles.input}
            />

            <div style={styles.helper}>
              Máximo de {maxLength} números
            </div>
          </div>
        )}

        {/* 🔥 BOTÃO */}
        <ConfirmButton
          visible={value.length === maxLength}
          onClick={handleClick}
        />

      </div>

    </div>
  )
}

export default FilterTipeShearch