import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

import UsuarioContext from "../context/UsuarioContext";

import "../assets/styles/inicio-sesion.css";

export function InicioSesion() {
  const { iniciarSesion } = useContext(UsuarioContext);
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasena: "",
  });

  const handleSetUsuario = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    iniciarSesion(usuario);
  };

  return (
    <Container className="my-3">
      <h4>Inicio de Sesión</h4>
      <Row className="inicio-sesion-form">
        <Col>
          <div className="border border-dark rounded p-3">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="formBasicEmail"
                label="Correo Electrónico"
                className="mt-3"
              >
                <Form.Control
                  type="email"
                  name="correo"
                  value={usuario.correo}
                  onChange={handleSetUsuario}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicPassword"
                label="Contraseña"
                className="mt-3"
              >
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={usuario.contrasena}
                  onChange={handleSetUsuario}
                  required
                />
              </FloatingLabel>

              <div className="text-center">
                <Button
                  type="submit"
                  id="submit-button"
                  size="lg"
                  className="mt-3"
                >
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <p>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </Container>
  );
}
