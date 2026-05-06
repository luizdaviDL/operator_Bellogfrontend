import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FillesPdf from './danone/pages/FillesPdf.jsx'
import DateInputs from './danone/components/DateInputs.jsx'
import NfeFlow from './components/flows/NfeFlow.jsx'
import Tryp from './danone/guides/Tryp.jsx'

import App from './App.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <NfeFlow />, // 🔥 controla estado do fluxo
        children: [
          {
            path: "cadastro_de_nfe",
            element: <FillesPdf props={"Enviar Nf-es"} url={"/faturamento"}/>, // ✅ etapa 1
          },
          {
            path: "faturamento",
            element: <DateInputs props={"data do faturamento"} type={"faturamento"} />, // etapa 2
          },
          {
            path: "chegada",
            element: <DateInputs props={"data de chegada da carreta"} type={"chegada"} />, // etapa 3
          },
          {
            path: "buscar_guia",
            element: <FillesPdf props={"Enviar Guias"} url={"/embarque"}/>,
          },
          {
            path: "embarque",
            element: <Tryp label={"Digite o numero de embarque"}/>,
          }
        ]
      }
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);