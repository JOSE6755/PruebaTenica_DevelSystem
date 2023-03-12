import { useEffect, useState } from "react";
import axios from 'axios'
import "./styles/app.css"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link, Outlet, useNavigate } from "react-router-dom";
function BasicExample() {
  const navigate=useNavigate()
  const [datos,setDatos]=useState({correo:"",contrasenia:""})

  const enviar=async (e)=>{
    e.preventDefault()
    try {
      const result=await axios.post("https://localhost:7177/api/User/Login",JSON.stringify(datos),{headers:{"content-type":"application/problem+json; charset=utf-8"}})
      const id=result.data.id
      localStorage.setItem("idUsuario",id)
      navigate(`/usuario/${localStorage.getItem("idUsuario")}`)
    } catch (error) {
      console.log(error.response.data)
    }
    
    
  }

  return (
    <Container fluid="true" className="d-flex justify-content-center align-items-center w-100 vh-100 ">
      <Form className="form-container px-2 py-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-light">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setDatos({...datos,correo:e.target.value})}} />
          <Form.Text className="text-light">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>{setDatos({...datos,contrasenia:e.target.value})}} />
        </Form.Group>
        
        <Button variant="light" type="submit" onClick={(e)=>enviar(e)}>
          Login
        </Button>
        <Link to="/registro" className="d-block">No tienes cuenta?</Link>
      </Form>
      <div id="detail"><Outlet/></div>
    </Container>
  );
}

export default BasicExample;
