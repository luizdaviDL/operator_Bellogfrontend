import React, { useState, useEffect } from 'react'
import SidebarMenu from '../danone/components/SidebarMenu';
import { Outlet } from "react-router-dom";

const MainComponent = () => {

  // 🔥 inicializa pegando do localStorage
  const [company, setCompany] = useState(() => {
    return localStorage.getItem("company") || "";
  });

  const [action, setAction] = useState(() => {
    return localStorage.getItem("action") || "";
  });

  // 🔥 sempre que mudar, salva
  useEffect(() => {
    localStorage.setItem("company", company);
  }, [company]);

  useEffect(() => {
    localStorage.setItem("action", action);
  }, [action]);

  const styles = {
    layout: {
      display: "flex",
    },
    sidebar: {
      width: "250px",
      height: "100vh",
      background: "linear-gradient(180deg, #1e1e2f, #2a2a40)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "30px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.2)"
    },
    container: {
      width: "80%",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    logoText: {
      fontWeight: "bold",
      fontSize: "18px"
    },
    label: {
      fontSize: "14px",
      color: "#ccc"
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      background: "#3a3a55",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: ".75rem"
    },
    menuWrapper: {
      marginTop: "10px"
    }
  };

  return (
    <div style={styles.layout}>
      <section style={styles.sidebar}>
        <div style={styles.container}>

          {/* Header */}
          <div style={styles.header}>
            <span style={styles.logoText}>Operador</span>
            <img
              src="belog.png"
              alt="Logo Belog"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
          </div>

          {/* Select */}
          <div>
            <label htmlFor="empresa" style={styles.label}>
              Escolha o cliente
            </label>

            <select
              id="empresa"
              style={styles.select}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="danone">Danone</option>
              <option value="viggor">Viggor</option>
              <option value="flamboyan">Flamboyan</option>
            </select>
          </div>

          {/* Menu */}
          <div style={styles.menuWrapper}>
            {company === "danone" && (
              <SidebarMenu onSelect={setAction} selectedAction={action} />
            )}
          </div>

        </div>
      </section>

      <section style={{ position: "relative", flex: 1 }}>
        <Outlet />
      </section>
    </div>
  );
};

export default MainComponent;