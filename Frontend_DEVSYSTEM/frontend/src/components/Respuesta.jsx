import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Respuesta() {
  const { idEncuesta } = useParams();
  const [campos, setCampos] = useState([]);
  const [encuesta,setEncuesta]=useState({nombre:"",descripcion:""})
  useEffect(() => {
    const lista = async () => {
      try {
        const result = await axios.get(
          `https://localhost:7177/response/${idEncuesta}`
        );
        console.log(result);
        setCampos(result.data.datos)
        setEncuesta({nombre:result.data.datos[0].encuesta.nombre,descripcion:result.data.datos[0].encuesta.descripcion})
        console.log(campos)
      } catch (error) {
        console.log(error);
      }
    };
    lista();
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 vh-100">
        <h2>{encuesta.nombre}</h2>
        <h3>{encuesta.descripcion}</h3>
      <Form className="d-grid justify-content-center align-items-center gap-4 w-100">
        {campos.length !== 0 ? (
          campos.map((value) => {
            return(<Form.Group key={value.idCampo} className="w-100">
              <Form.Label>{value.campo.nombre}</Form.Label>
              {value.requerido===1?<Form.Control type={`${value.campo.idTipo_campo===1?"text":value.campo.idTipo_campo===2?"date":"number"}`} required/>:<Form.Control type={`${value.campo.idTipo_campo===1?"text":value.campo.idTipo_campo===2?"date":"number"}`} />}
             
            </Form.Group>)
          })
        ) : (
          <h2>Vaya! Al parecer esta encuesta no cuenta con campos</h2>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </Form>
    </Container>
  );
}

export default Respuesta;
