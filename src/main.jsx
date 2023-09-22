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

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register-personal",
    element: <Register />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  //Rutas Tarjetas
  {
    path: "/Areas",
    element: <Areas />,
  },
  {
    path: "/area-edit/:id",
    element: <AreaEdit />,
  },
  {
    path: "/area-info/:id",
    element: <AreaInfo />,
  },
  {
    path: "/Monitoreo",
    element: <Monitoreo />,
  },
  {
    path: "/Personal",
    element: <Personal />,
  },
  {
    path: "/Patients",
    element: <Pacientes />,
  },
  {
    path: "/Editar",
    element: <Editar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
