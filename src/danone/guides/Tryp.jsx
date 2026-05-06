import React, { useState } from 'react';
import ConfirmButton from '../../components/buttons/ConfirmButton';
import { useNavigate ,useOutletContext} from "react-router-dom";
import Processing from '../../components/alerts/Processing';
import Success from '../../components/alerts/Success';
import ErrorAlert from '../../components/alerts/Error';
import Service from '../service/Service';

const Tryp = ({label}) => {
  const service = new Service()

  const MAX_LENGTH = 10; // 🔥 tamanho fixo (ex: 5017702481)

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {    
    embarque, 
    files,
    setEmbarque
  }= useOutletContext();

  // 🔥 controla input (somente números + limite)
  const handleChange = (e) => {
    let input = e.target.value;

    // remove tudo que não for número
    input = input.replace(/\D/g, "");

    // limita tamanho
    if (input.length <= MAX_LENGTH) {
      setValue(input);
      setEmbarque(input)
    }
  };

  const payload = {
    embarque, 
    files
  }


  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);


      const result = await service.guide_service(payload)

      if(!result){
        setError(result.status);
      }
      setTimeout(() => {
        setSuccess(result.status);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setLoading(false);
      setError("Erro ao processar");
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

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <Processing text="Processando..." />
        </div>
      )}

      {/* ERRO */}
      {error && (
        <div style={styles.loadingOverlay}>
          <ErrorAlert text={error} onClose={() => setError(null)} />
        </div>
      )}

      {/* SUCESSO */}
      {success && (
        <div style={styles.loadingOverlay}>
          <Success text={success} />
        </div>
      )}

      <div style={styles.modal}>

        <label style={styles.label}>
          {label}
        </label>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Ex: 5017702481"
          style={styles.input}
        />

        <ConfirmButton
          visible={value.length === MAX_LENGTH} // 🔥 só aparece completo
          onClick={handleClick}
        />

      </div>
    </div>
  );
};

export default Tryp;