import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import Register from "./components/Registro";
import Encuesta from "./components/ListaEncuesta";
import CrearEncuesta from "./components/CrearEncuesta";
import CrearCampos from "./components/CrearCampos";
import Respuesta from "./components/Respuesta"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registro",
    element: <Register />,
  },
  {
    path: "usuario/:id/",
    element: <Encuesta />,
    
  },
  {
    path:"usuario/:id/crearEncuesta",
    element:<CrearEncuesta/>
  },

  {
    path:"usuario/:id/:encuestaId/crearCampos",
    element:<CrearCampos/>
  },
  {
    path:"encuesta/response/:idEncuesta",
    element:<Respuesta/>
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
