import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Alert from 'react-bootstrap/Alert';

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormularioCampo from "./FormularioCampo";
import ListaCampos from "./ListaCampos";
import axios from "axios";
import { useParams } from "react-router-dom";

function CrearCampos() {
  const {id,encuestaId}=useParams()

  const [campoData, setCampoData] = useState({
    titulo: "",
    nombre: "",
    idTipo: 1,
    idEncuesta:encuestaId,
    idUsuario:id
  });
  const [campos,setCampos]=useState([])
  const [exito,setExito]=useState(false)
  const [encuesta,setEncuesta]=useState(null)
  useEffect(()=>{
    console.log(id,encuestaId)
    const listado = async () => {
      try {
        const result = await axios.get(`https://localhost:7177/api/Encuesta/${id}/${encuestaId}`, {
          headers: {
            "Content-Type": "application/problem+json; charset=utf-8",
          },
        });
        console.log(result.data)
        setEncuesta(result.data[0].encuesta)
        llenar(result);
      } catch (error) {
        console.log(error);
      }
    };
    listado();
  },[])

  
  const enviar = async (e) => {
    e.preventDefault();
    console.log(campoData);
    if (campoData.titulo === "" && campoData.nombre === "") {
      window.alert("Los campos titulo y nombre son obligatorios");
    } else {
      try {
        const result = await axios.post(
          "https://localhost:7177/api/Campo/CreateCampo",
          JSON.stringify(campoData),
          {
            headers: {
              "Content-Type": "application/problem+json; charset=utf-8",
            },
          }
        );
        console.log(result)
      } catch (error) {
        console.log(error)
      }
      setShow(false);
      setCampoData({
        titulo: "",
        nombre: "",
        idTipo: 1,
        required: false,
        idEncuesta:1,
        idUsuario:1
      });
      setExito(true)
    }
  };
  const llenar = (result) => {
    result.data.map((value) => {
      setCampos((campos) => [...campos, value.campo]);
    });
    console.log(campos)

    
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      {encuesta?<><h2>{encuesta.nombre}</h2>
      <div>
        <p>
          {encuesta.descripcion}
        </p>
      </div></>:<h2>No existe la encuesta!</h2>}
      
      {exito!==false?<Alert variant="success">
          Encuesta creada con exito! recarge la pagina para ver los cambios.
        </Alert>:null}

      <ListaCampos datos={campos} />

      <Button variant="primary" onClick={handleShow}>
        Crear nuevo campo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo campo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioCampo form={setCampoData} datos={campoData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={(e) => {
              enviar(e);
            }}
          >
            Crear!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CrearCampos;
