import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

function FormularioCampo({ form, datos }) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Titulo</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Titulo"
          value={datos.titulo!==""?datos.titulo:""}
          onChange={(e) => {
            form({ ...datos, titulo: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Nombre"
          value={datos.nombre!==""?datos.nombre:""}
          onChange={(e) => {
            form({ ...datos, nombre: e.target.value });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Selecciona un tipo de dato</Form.Label>
        <Form.Control
          value="1"
          as="select"
          onChange={(e) => {
            form({ ...datos, idTipo: Number(e.target.value) });
          }}
        >
          <option value="1">Texto</option>
          <option value="2">Fecha</option>
          <option value="3">Numero</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Requerido"
          defaultChecked={datos.requerido!==1?false:true}
          onClick={(e) => {
            form({ ...datos, requerido: Number(e.target.checked) });
          }}
        />
      </Form.Group>
    </Form>
  );
}

export default FormularioCampo;
