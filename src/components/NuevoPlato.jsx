import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";

import "../assets/styles/nuevo-plato.css";

export function NuevoPlato() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [calorias, setCalorias] = useState("");
  const [precio, setPrecio] = useState("");
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    const tiposIngredientes = [
      "Fondo",
      "Acompañamiento",
      "Ensalada",
      "Postre",
      "Bebestible",
    ];
    setIngredientes(tiposIngredientes.map((tipo) => ({ tipo, nombre: "" })));
  }, []);

  const handleInputChange = (index, event) => {
    const values = [...ingredientes];
    values[index] = {
      ...values[index],
      nombre: event.target.value,
    };
    setIngredientes(values);
  };

  // limpia los valores de los inputs
  const restablecerValores = () => {
    setNombre("");
    setDescripcion("");
    setImagen("");
    setCalorias("");
    setPrecio("");
    const tiposIngredientes = [
      "Fondo",
      "Acompañamiento",
      "Ensalada",
      "Postre",
      "Bebestible",
    ];
    setIngredientes(tiposIngredientes.map((tipo) => ({ tipo, nombre: "" })));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const menu = {
        nombre,
        descripcion,
        imagen,
        calorias,
        precio,
        ingredientes,
      };
      // console.log(menu);
      await axios.post("http://18.116.49.213:3000/menus", menu);
      alert(`Plato ${menu.nombre} creado con éxito`);
      restablecerValores();
    } catch (error) {
      console.error("Error añadiendo el plato nuevo: ", error);
    }
  };

  return (
    <Container className="my-3">
      <Row className="nuevo-plato-form">
        <h4 className="mb-3">Agregar un nuevo plato a la base de datos</h4>
        <Col>
          <div className="border border-dark rounded p-3">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="nombre"
                label="Nombre del Plato"
                className="mt-3"
              >
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="descripcion"
                label="Descripción del Plato"
                className="mt-3"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="imagen"
                label="URL de la Imagen del Plato"
                className="mt-3"
              >
                <Form.Control
                  type="text"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="calorias"
                label="Calorías del Plato"
                className="mt-3"
              >
                <Form.Control
                  type="number"
                  value={calorias}
                  onChange={(e) => setCalorias(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="precio"
                label="Precio del Plato"
                className="mt-3"
              >
                <Form.Control
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </FloatingLabel>

              <fieldset className="d-flex flex-column align-items-center">
                <h4 className="mt-4 mb-3">Ingredientes:</h4>
                {ingredientes.map((ingrediente, index) => (
                  <Row key={index} className="align-items-center">
                    <Col sm={12} md={6}>
                      <Form.Group
                        controlId={`ingredienteTipo-${index}`}
                        className="text-center"
                      >
                        <Form.Label className="my-2">
                          {ingrediente.tipo}
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group
                        controlId={`ingredienteNombre-${index}`}
                        className="input-width"
                      >
                        <Form.Control
                          type="text"
                          value={ingrediente.nombre}
                          onChange={(e) => handleInputChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ))}
              </fieldset>

              <div className="text-center">
                <Button
                  type="submit"
                  id="submit-button"
                  size="md"
                  className="mt-3"
                >
                  Crear Plato
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
