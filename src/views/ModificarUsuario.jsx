import { useState, useContext, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import UsuarioContext from "../context/UsuarioContext";

export function ModificarUsuario() {
  const { usuario, actualizarUsuario } = useContext(UsuarioContext);
  const [datosUsuario, setDatosUsuario] = useState({ ...usuario });

  // Cuando el usuario cambie, actualizamos los datos del formulario
  useEffect(() => {
    setDatosUsuario({ ...usuario });
  }, [usuario]);

  const handleSetDatosUsuario = (event) => {
    setDatosUsuario({
      ...datosUsuario,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actualizarUsuario(datosUsuario);
  };

  return (
    <Container className="my-3">
      <h5 className="mb-3">Rellena los campos que deseas cambiar:</h5>
      <Row className="perfil-usuario-form">
        <Col>
          <div className="border border-dark rounded p-3">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="formBasicNombre"
                label="Nombre"
                className="mt-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  value={datosUsuario.nombre || ""}
                  onChange={handleSetDatosUsuario}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicApellido"
                label="Apellido"
                className="mt-3"
              >
                <Form.Control
                  type="text"
                  name="apellido"
                  value={datosUsuario.apellido || ""}
                  onChange={handleSetDatosUsuario}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicDireccion"
                label="Dirección"
                className="mt-3"
              >
                <Form.Control
                  type="text"
                  name="direccion"
                  value={datosUsuario.direccion || ""}
                  onChange={handleSetDatosUsuario}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicTelefono"
                label="Teléfono"
                className="mt-3"
              >
                <Form.Control
                  type="text"
                  name="telefono"
                  value={datosUsuario.telefono || ""}
                  onChange={handleSetDatosUsuario}
                />
              </FloatingLabel>

              <div className="text-center">
                <Button
                  type="submit"
                  id="submit-button"
                  size="md"
                  className="mt-3"
                >
                  Actualizar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}