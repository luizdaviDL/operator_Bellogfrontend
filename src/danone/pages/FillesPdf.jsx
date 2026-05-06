import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const FillesPdf = ({props, url}) => {
  const navigate = useNavigate();
  
  const styles = {
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)", // fundo escuro transparente
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    },
    modal: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      width: "300px",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    },
    button: {
      marginTop: "15px",
      padding: "10px 15px",
      borderRadius: "8px",
      border: "none",
      background: "#6c63ff",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px"
    },
    input: {
      display: "none"
    }
  };

  const { setFiles } = useOutletContext();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      navigate(url); // 🔥 muda a URL
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{props}</h3>

        <input 
          type="file" 
          id="fileUpload" 
          style={styles.input}
          onChange={handleFileChange}
          multiple
        />

        <label htmlFor="fileUpload">
          <div style={styles.button}>
            Selecionar arquivo
          </div>
        </label>

      </div>
    </div>
  )
}

export default FillesPdf