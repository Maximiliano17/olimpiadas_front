// Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Components
import App from "./App.jsx";
import Register from "./components/RegisterPersonal.jsx";
import Pacientes from "./views/Pacientes.jsx";
import Personal from "./views/Personal.jsx";
import Home from "./views/Home.jsx";
import Areas from "./views/Areas.jsx";
import Monitoreo from "./views/Monitoreo.jsx";
import AreaEdit from "./components/AreaInfo.jsx";
import AreaInfo from "./components/areaInfoMonitor.jsx";
import Editar from "./components/Editar.jsx";
import EditarPatient from "./components/EditarPatient.jsx";
import EditarArea from "./components/EditarArea.jsx";
import { AlarmProvider } from "./contexts/AlarmContext.jsx";

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AlarmProvider>
        <App />
      </AlarmProvider>
    ),
  },
  {
    path: "/register-personal",
    element: (
      <AlarmProvider>
        <Register />
      </AlarmProvider>
    ),
  },
  {
    path: "/Home",
    element: (
      <AlarmProvider>
        <Home />
      </AlarmProvider>
    ),
  },
  //Rutas Tarjetas
  {
    path: "/Areas",
    element: (
      <AlarmProvider>
        <Areas />
      </AlarmProvider>
    ),
  },
  {
    path: "/area-edit/:id",
    element: (
      <AlarmProvider>
        <AreaEdit />
      </AlarmProvider>
    ),
  },
  {
    path: "/area-info/:id",
    element: (
      <AlarmProvider>
        <AreaInfo />
      </AlarmProvider>
    ),
  },
  {
    path: "/Monitoreo",
    element: (
      <AlarmProvider>
        <Monitoreo />
      </AlarmProvider>
    ),
  },
  {
    path: "/Personal",
    element: (
      <AlarmProvider>
        <Personal />
      </AlarmProvider>
    ),
  },
  {
    path: "/Patients",
    element: (
      <AlarmProvider>
        <Pacientes />
      </AlarmProvider>
    ),
  },
  {
    path: "/Editar/:id",
    element: <Editar />,
  },
  {
    path: "/Editar-paciente/:id",
    element: <EditarPatient />,
  },
  {
    path: "/Editar-area/:id",
    element: <EditarArea />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
