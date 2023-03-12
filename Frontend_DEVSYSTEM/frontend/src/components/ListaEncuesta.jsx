import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import NoEncuesta from "./NoEncuesta";
import axios from "axios";
import { Link } from "react-router-dom";

function Encuesta() {
  const [encuesta, setEncuesta] = useState([]);
  useEffect(() => {
    const obtenerEncuesta = async () => {
      try {
        const result = await axios.get(
          `https://localhost:7177/api/Encuesta/${localStorage.getItem(
            "idUsuario"
          )}`,
          {
            headers: {
              "Content-Type": "application/problem+json; charset=utf-8",
            },
          }
        );
        setEncuesta(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerEncuesta();
  }, []);

  const eliminar = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`https://localhost:7177/api/Encuesta/${id}`, {
        headers: { "Content-Type": "application/problem+json; charset=utf-8" },
      });
      setEncuesta(
        encuesta.map((value) => {
          if (value.idEncuesta === id) {
            return { ...value, disabled: true };
          } else {
            return value;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(encuesta);
  }, [encuesta]);
  return (
    <>
      {encuesta.length!==0 ? (
        <>
          <ListGroup className="d-flex justify-content-center align-items-center w-100 vh-100 gap-3">
            <h2>Aqui estan tus encuestas!</h2>
            {encuesta.map((item) => {
              if (item.disabled) {
                return (
                  <ListGroup.Item
                    key={item.idEncuesta}
                    className="d-flex justify-content-center align-items-center gap-3 w-100"
                    disabled
                  >
                    <p>{item.nombre}</p>

                    <Button variant="success">Resultados</Button>
                    <Link to={`${item.idEncuesta}/crearCampos`}>
                      <Button variant="warning">Editar</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        eliminar(e, item.idEncuesta);
                      }}
                    >
                      Eliminar
                    </Button>
                  </ListGroup.Item>
                );
              }
              return (
                <ListGroup.Item
                  key={item.idEncuesta}
                  className="d-flex justify-content-center align-items-center gap-3 w-100"
                >
                  <p>{item.nombre}</p>
                  <Link
                    to={`/encuesta/response/${item.idEncuesta}`}
                  >{`Url: encuesta/response/${item.idEncuesta}`}</Link>

                  <Button variant="success">Resultados</Button>
                  <Link to={`${item.idEncuesta}/crearCampos`}>
                    <Button variant="warning">Editar</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      eliminar(e, item.idEncuesta);
                    }}
                  >
                    Eliminar
                  </Button>
                </ListGroup.Item>
              );
            })}
            <Link to="crearEncuesta">
              <Button variant="success">
                Crear encuesta!
              </Button>
            </Link>
          </ListGroup>
        </>
      ) : (
        <NoEncuesta />
      )}
    </>
  );
}

export default Encuesta;
