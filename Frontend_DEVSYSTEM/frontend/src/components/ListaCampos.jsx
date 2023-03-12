import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import FormularioCampo from "./FormularioCampo";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useParams } from "react-router-dom";
function ListaCampos({ datos }) {
  const { id, encuestaId } = useParams();
  const [campos, setCampos] = useState([]);
  const [encuesta, setEncuesta] = useState(null);
  const [newDatos, setNewDatos] = useState({
    nombre: "",
    titulo: "",
    requerido: 0,
    idTipo: 1,
    idEncuesta: Number(encuestaId),
    idUsuario: Number(id),
    idCampo: 0,
  });
  const [show, setShow] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    //console.log(datos)
    const listado = async () => {
      try {
        const result = await axios.get(
          `https://localhost:7177/api/Encuesta/${id}/${encuestaId}`,
          {
            headers: {
              "Content-Type": "application/problem+json; charset=utf-8",
            },
          }
        );
        console.log(result);
        setEncuesta(result.data);
        llenar(result);
      } catch (error) {
        console.log(error);
      }
    };
    listado();
  }, []);

  const llenar = (result) => {
    result.data.map((value) => {
      if (value.campo) {
        setCampos((campos) => [...campos, value.campo]);
      }
    });
  };

  useEffect(() => {
    console.log(campos, "hola");
    console.log(encuesta);
  }, [campos]);

  const editar = async (e) => {
    e.preventDefault();

    console.log();
  };

  const handleClose = () => setShow(false);
  const handleShow = (datosEncuesta) => {
    setNewDatos({
      nombre: datosEncuesta.nombre,
      titulo: datosEncuesta.titulo,
      requerido: datosEncuesta.requerido,
      idTipo: datosEncuesta.idTipo_campo,
      idEncuesta: Number(encuestaId),
      idUsuario: Number(id),
      idCampo: Number(datosEncuesta.idCampo),
    });
    setShow(true);
  };
  const enviar = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `https://localhost:7177/api/Campo/${newDatos.idCampo}`,
        JSON.stringify(newDatos),
        {
          headers: {
            "Content-Type": "application/problem+json; charset=utf-8",
          },
        }
      );
      setExito(true);
      setShow(false);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (e, datos) => {
    e.preventDefault();
    try {
      const result = await axios.delete(
        `https://localhost:7177/api/Campo/${datos.idCampo}`,
        {
          headers: {
            "Content-Type": "application/problem+json; charset=utf-8",
          },
        }
      );
      console.log(result);
      setExito(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {exito !== false ? (
        <Alert variant="success">
          Encuesta Editada con exito! recarge la pagina para ver los cambios.
        </Alert>
      ) : null}

      {campos.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Titulo</th>
              <th>Nombre</th>
              <th>Requerido</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {campos.map((value) => {
              return (
                <tr key={value.idCampo}>
                  <td>{value.idCampo}</td>
                  <td>{value.titulo}</td>
                  <td>{value.nombre}</td>
                  <td>{value.requerido === 1 ? "true" : "false"}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={(e) => {
                        handleShow(value);
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        eliminar(e, value);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2>Aun no tienes campos creados!</h2>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo campo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioCampo form={setNewDatos} datos={newDatos} />
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
            Editar!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListaCampos;
