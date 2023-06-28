import { Link } from "react-router-dom";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import { formatCurrency } from "../helpers/formatCurrency";

import "../assets/styles/cardmenu.css";

export function CardMenu({ menu, addToCart, isAdded }) {
  const handleAddToCart = () => {
    addToCart(menu);
  };

  return (
    <Card id="card-menu">
      <Card.Img
        variant="top"
        src={menu.imagen}
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <Card.Title>{menu.nombre}</Card.Title>
        <Card.Text id="descripcion-card-menu">{menu.descripcion}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {" "}
          <strong>Precio:</strong> {formatCurrency(menu.precio)}
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer className="d-flex align-items-center justify-content-center">
        <Button
          as={Link}
          to={`/detalle-plato/${menu.id}`}
          variant="outline-dark"
        >
          Ver Más <FontAwesomeIcon icon={faEye} />
        </Button>{" "}
        <Button
          variant="outline-dark"
          disabled={isAdded}
          onClick={handleAddToCart}
          className="ms-2"
        >
          {isAdded ? (
            <>
              Agregado <FontAwesomeIcon icon={faCheck} />
            </>
          ) : (
            <>
              Agregar <FontAwesomeIcon icon={faCartPlus} />
            </>
          )}
        </Button>{" "}
      </Card.Footer>
    </Card>
  );
}
