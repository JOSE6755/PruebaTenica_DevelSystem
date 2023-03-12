import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CrearEncuesta() {
  const [encuestaData,setEncuestaData]=useState({nombre:"",descripcion:"",idUsuario:localStorage.getItem("idUsuario")})
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);

  const enviar=async(e)=>{
    e.preventDefault()
    try {
      const result=await axios.post("https://localhost:7177/api/Encuesta/Create",JSON.stringify(encuestaData),{headers:{
        "Content-Type":"application/problem+json; charset=utf-8"
      }})
      console.log(result)
      setExito(true)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
       {exito !== false ? (
        <Alert variant="success">
          Encuesta Creada con exito! recarge la pagina para ver los cambios.
          <Link to={`/usuario/${localStorage.getItem("idUsuario")}`}>
            <Button>Volver!</Button>
          </Link>
        </Alert>
      ) : null}
      {error !== false ? (
        <Alert variant="danger">No se pudo crear la encuesta</Alert>
      ) : null}
      <Form className="w-50 d-flex flex-column justify-content-center gap-5">
        <Form.Group className="" controlId="formBasicEmail">
          <Form.Label>Nombre de la encuesta</Form.Label>
          <Form.Control type="text" placeholder="Nombre" onChange={(e)=>{setEncuestaData({...encuestaData,nombre:e.target.value})}} />
          
        </Form.Group>

        <Form.Group className="" controlId="formBasicPassword">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control as="textArea" placeholder="Descripcion" onChange={(e)=>{setEncuestaData({...encuestaData,descripcion:e.target.value})}} />
        </Form.Group>
        
        <Button variant="success" type="submit" onClick={(e)=>{enviar(e)}}>
          Crear encuesta!
        </Button>
      </Form>
    </Container>
  );
}

export default CrearEncuesta
