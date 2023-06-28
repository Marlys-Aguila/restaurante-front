import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Element } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import map from "../assets/img/map.png";
import "../assets/styles/sobre-nosotros.css";

export function SobreNosotros() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  // Botón scroll to top
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <Container className="my-3">
      {/* Quiénes somos */}
      <Row className="mb-5">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <h4 className="text-center">Sobre Nosotros</h4>
          <div className="mb-2">
            <Link
              to="ubicacion"
              spy={true}
              delay={0}
              duration={500}
              smooth={true}
            >
              <Button variant="primary" className="m-2" id="boton-ubicacion">
                Ubicación
              </Button>
            </Link>
            <Link
              to="contacto"
              spy={true}
              delay={0}
              duration={500}
              smooth={true}
            >
              <Button variant="primary" className="m-2" id="boton-contacto">
                Contacto
              </Button>
            </Link>
          </div>

          <p id="parrafo-1">
            Somos un restaurante chileno dedicado a resaltar los sabores de
            nuestra geografía de norte a sur. Ofrecemos platos inspirados en la
            rica diversidad de nuestra tierra, desde la "Fiesta Andina" que
            lleva sabores de la cultura andina hasta el "Encanto Mapuche" que es
            un viaje culinario a la cultura mapuche. Disfrute de los sabores de
            la Patagonia con nuestro "Riqueza Patagónica", o pruebe el sabor del
            mar con nuestro "Sabor a Puerto". Para los amantes de las legumbres,
            ofrecemos el "Legumbre Sureña", y no olvide probar nuestras
            "Sorpresas del Maule". Cada uno de nuestros platos incorpora la
            esencia de la cultura chilena y resalta la herencia de nuestra rica
            y diversa tradición culinaria.
          </p>
        </Col>
      </Row>
      <Row id="vision-mision">
        <Col md={6}>
          <h4 className="text-center">Visión</h4>
          <p id="parrafo-2">
            Buscamos ser reconocidos como el mejor restaurante de comida típica
            chilena, entregando una experiencia culinaria única que invite a
            nuestros comensales a viajar por Chile a través de sus sabores.
            Queremos hacer sentir a cada cliente como si estuviera disfrutando
            de un plato casero, preparado con amor y respeto por nuestras raíces
            y tradiciones.
          </p>
        </Col>
        <Col md={6}>
          <h4 className="text-center">Misión</h4>
          <p id="parrafo-3">
            Nuestra misión es deleitar a nuestros clientes con auténtica comida
            chilena, preparada con ingredientes de la más alta calidad y servida
            en un ambiente cálido y acogedor. Nos esforzamos por respetar y
            preservar nuestras tradiciones culinarias mientras innovamos para
            ofrecer nuevas y emocionantes interpretaciones de los clásicos.
          </p>
        </Col>
      </Row>

      {/* Ubicación */}
      <Element name="ubicacion">
        <Row className="mt-5">
          <Col md={6}>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <h3 className="pb-3">Dónde nos puedes encontrar:</h3>
              <h5 className="text-center">
                Pdte. Riesco 35811, Santiago, Chile
              </h5>
            </div>
          </Col>
          <Col md={6} id="imgCol">
            <img src={map} id="mapImage" alt="Google Maps" />
          </Col>
        </Row>
      </Element>

      {/* Formulario de Contacto */}
      <Element name="contacto">
        <Row className="mt-5">
          <Col>
            <h2 className="text-center">Contacto</h2>
            <Form
              onSubmit={handleSubmit}
              style={{ width: "500px" }}
              id="contactForm"
            >
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Ingresa tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mt-2">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  placeholder="Ingresa tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  id="submit-button"
                  size="lg"
                  className="mt-2"
                >
                  Enviar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Element>

      <div
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 50, width: 50, display: showScroll ? "flex" : "none" }}
      >
        <FontAwesomeIcon icon={faArrowUp} style={{ height: 40 }} />
      </div>
    </Container>
  );
}
