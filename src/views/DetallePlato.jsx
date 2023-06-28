import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { CarritoContext } from "../context/CarritoContext";
import { formatCurrency } from "../helpers/formatCurrency";

export function DetallePlato() {
  const { id } = useParams();
  const { cart, addToCart } = useContext(CarritoContext);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch(`https://restaurante-4.vercel.app/menus/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(menu);
  };

  const isPlatoInCart = () => {
    return cart.some((item) => item.id === menu.id);
  };

  return menu ? (
    <Container className="my-4">
      <Card id="card-detalle" style={{ overflow: "hidden" }}>
        <Row>
          <Col md={6} className="p-0">
            <Card.Img
              variant="top"
              src={menu.imagen}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Col>
          <Col md={6} className="p-0">
            <Card.Body>
              <Card.Title className="ms-3">{menu.nombre}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <strong>Ingredientes:</strong>
                  <ul className="mt-2">
                    {menu.ingredientes.map((ingrediente, index) => (
                      <li key={index}>
                        <strong>{ingrediente.tipo}:</strong>{" "}
                        {ingrediente.nombre}
                      </li>
                    ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Precio: </strong> {formatCurrency(menu.precio)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Calorias:</strong> {menu.calorias} cal.
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center align-items-center">
              <Button
                as={Link}
                to="/menu"
                variant="outline-dark"
                className="me-2"
              >
                Volver al Menú <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Button
                variant="outline-dark"
                disabled={isPlatoInCart()}
                onClick={handleAddToCart}
              >
                {isPlatoInCart() ? (
                  <>
                    Agregado <FontAwesomeIcon icon={faCheck} />
                  </>
                ) : (
                  <>
                    Agregar <FontAwesomeIcon icon={faCartPlus} />
                  </>
                )}
              </Button>
            </Card.Footer>
          </Col>
        </Row>
      </Card>
    </Container>
  ) : (
    "Cargando..."
  );
}
