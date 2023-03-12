import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userData,setUserData]=useState({nombre:"",correo:"",contasenia:""})
  const [success,setSuccess]=useState(true)
  const navigate=useNavigate()
  const enviar=async (e)=>{
    e.preventDefault()
    try {
      const result=await axios.post("https://localhost:7177/api/User/Register",JSON.stringify(userData),{headers:{"Content-Type":"application/problem+json; charset=utf-8"}})
      console.log(result)
      setSuccess(true)
      navigate("/")
    } catch (error) {
      setSuccess(false)
    }
  }

  return (
    <Container
      fluid="true"
      className="d-flex flex-column justify-content-center align-items-center w-100 vh-100 "
    >
      {!success?<Alert variant="danger" className="w-25">
          Correo ya existente!
        </Alert>:null}
      <Form className="form-container px-2 py-2 d-grid justify-content-center align-items-center gap-1 " >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-light">Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" onChange={(e)=>{setUserData({...userData,nombre:e.target.value})}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-light">Correo</Form.Label>
          <Form.Control type="email" placeholder="Email" onChange={(e)=>{setUserData({...userData,correo:e.target.value})}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label className="text-light">Contrasenia</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserData({...userData,contasenia:e.target.value})}} />
        </Form.Group>
        <Button variant="light" type="submit" size="sm" onClick={(e)=>{enviar(e)}}>
          Crear!
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
