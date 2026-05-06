import React from "react";

const ConfirmButton = ({ visible, onClick }) => {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "15px",
        padding: "10px 15px",
        borderRadius: "8px",
        border: "none",
        background: "#6c63ff",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
        transition: "0.3s"
      }}
    >
      Confirmar
    </button>
  );
};

export default ConfirmButton;