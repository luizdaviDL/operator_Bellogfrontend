import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarMenu({ onSelect }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(() => {
    return localStorage.getItem("menuOpen") || null;
  });

  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("selectedMenu") || "";
  });

  const toggle = (menu) => {
    const newValue = open === menu ? null : menu;
    setOpen(newValue);
    localStorage.setItem("menuOpen", newValue);
  };

  const handleSelect = (path) => {
    setSelected(path);
    localStorage.setItem("selectedMenu", path);

    onSelect && onSelect(path);
    navigate(path);
  };

  const styles = {
    container: {
      width: "250px",
      color: "#fff",
      fontFamily: "Arial"
    },

    item: (isActive) => ({
      cursor: "pointer",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "8px",
      opacity: isActive ? 1 : 0.5,
      transition: "0.3s"
    }),

    title: {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },

    dropdown: {
      marginTop: "5px",
      marginLeft: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },

    option: (isSelected) => ({
      padding: "8px 10px",
      borderRadius: "6px",
      cursor: "pointer",     
      opacity: isSelected ? 1 : 0.6,
      transition: "0.2s",
    })
  };

  return (
    <div style={styles.container}>

      {/* Operar */}
      <div>
        <div
          style={styles.item(open === "operar")}
          onClick={() => toggle("operar")}
        >
          <div style={styles.title}>
            <img src="operador.png" style={{ width: "1.65rem" }} />
            <span>Operar</span>
          </div>
        </div>

        {open === "operar" && (
          <div style={styles.dropdown}>
            <div
              style={styles.option(selected === "/cadastro_de_nfe")}
              onClick={() => handleSelect("/cadastro_de_nfe")}
            >
              Inserir Nf-e para Piso
            </div>

            <div
              style={styles.option(selected === "/buscar_guia")}
              onClick={() => handleSelect("/buscar_guia")}
            >
              Buscar Guias
            </div>

            <div
              style={styles.option(selected === "/buscar_nfe")}
              onClick={() => handleSelect("/buscar_nfe")}
            >
              Buscar Nf-e
            </div>
          </div>
        )}
      </div>

      {/* Buscar */}
      <div>
        <div
          style={styles.item(open === "buscar")}
          onClick={() => toggle("buscar")}
        >
          <div style={styles.title}>
            <img src="buscar.png" style={{ width: "1.65rem" }} />
            <span>Buscar</span>
          </div>
        </div>

        {open === "buscar" && (
          <div style={styles.dropdown}>
            <div
              style={styles.option(selected === "/data_guia")}
              onClick={() => handleSelect("/data_guia")}
            >
              Data na guia
            </div>
          </div>
        )}
      </div>

    </div>
  );
}