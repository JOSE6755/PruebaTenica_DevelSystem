import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function NoEncuesta(params) {
  
  
 
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center gap-5 vh-100">
     

      <h2>Aun no tienes encuestas creadas :(</h2>
      <h3>Crea una encuesta dando click al siguiente boton!</h3>
      <Link to="crearEncuesta">
        <Button variant="success" onClick={(e) => enviar(e)}>
          Crear encuesta!
        </Button>
      </Link>
    </Container>
  );
}

export default NoEncuesta;
