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

import "../assets/styles/registro-usuario.css";

export function Registro() {
  const { registrarUsuario } = useContext(UsuarioContext);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    rol: "",
    correo: "",
    telefono: "",
    direccion: "",
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
    registrarUsuario(usuario);
  };

  return (
    <Container className="my-3">
      <h4 className="mb-3">Registro de Usuario</h4>
      <Row className="registro-usuario-form">
        <Col>
          <div className="border border-dark rounded p-3">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FloatingLabel
                    controlId="formBasicNombre"
                    label="Nombre"
                    className="mt-3"
                  >
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={usuario.nombre}
                      onChange={handleSetUsuario}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel
                    controlId="formBasicApellido"
                    label="Apellido"
                    className="mt-3"
                  >
                    <Form.Control
                      type="text"
                      name="apellido"
                      value={usuario.apellido}
                      onChange={handleSetUsuario}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FloatingLabel
                    controlId="formBasicRol"
                    label="Rol"
                    className="mt-3"
                  >
                    <Form.Select
                      name="rol"
                      value={usuario.rol}
                      onChange={handleSetUsuario}
                      required
                    >
                      <option value="" disabled></option>
                      <option value="Cliente">Cliente</option>
                      <option value="Administrador">Administrador</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel
                    controlId="formBasicCorreo"
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
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FloatingLabel
                    controlId="formBasicTelefono"
                    label="Teléfono"
                    className="mt-3"
                  >
                    <Form.Control
                      type="tel"
                      name="telefono"
                      value={usuario.telefono}
                      onChange={handleSetUsuario}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel
                    controlId="formBasicDireccion"
                    label="Dirección"
                    className="mt-3"
                  >
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={usuario.direccion}
                      onChange={handleSetUsuario}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
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
                </Col>
              </Row>

              <div className="text-center">
                <Button
                  type="submit"
                  id="submit-button"
                  size="lg"
                  className="mt-3"
                >
                  Registrar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </Container>
  );
}
