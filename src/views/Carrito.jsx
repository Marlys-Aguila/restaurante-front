import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Image, Container } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faMinus,
  faPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CarritoContext } from "../context/CarritoContext";
import { formatCurrency } from "../helpers/formatCurrency";

import menu from "../assets/img/menu.webp";
import "../assets/styles/carrito.css";

export function Carrito() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CarritoContext);

  // Manejadores de aumento y disminución de cantidad de cada plato
  const handleIncreaseQuantity = (id) => {
    const wasIncreased = increaseQuantity(id);
    if (!wasIncreased) {
      toast.info("El límite máximo de platos que puedes llevar es 15", {
        autoClose: 3000,
      });
    }
  };

  const handleDecreaseQuantity = (id) => {
    const wasDecreased = decreaseQuantity(id);
    if (!wasDecreased) {
      toast.info(
        "La cantidad mínima a llevar es de 1. Si desea eliminar el plato presione el ícono correspondiente.",
        {
          autoClose: 5000,
        }
      );
    }
  };

  // Para establecer un ancho fijo de columnas al modificar la cantidad
  const [columnWidth, setColumnWidth] = useState(null);
  const [precioWidth, setPrecioWidth] = useState(null);

  useEffect(() => {
    const cantidadColumn = document.getElementById("cantidad-column");
    if (cantidadColumn) {
      setColumnWidth(cantidadColumn.offsetWidth);
    }

    const precioColumn = document.getElementById("precio-column");
    if (precioColumn) {
      setPrecioWidth(precioColumn.offsetWidth);
    }
  }, []);

  // Si el carrito está vacío, muestra un mensaje y un botón para ir al menú
  if (cart.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="text-center mt-3">
          <h4>El carrito está vacío</h4>
          <h5>Haz click en la imagen para ir al menú</h5>
        </div>
        <Link to="/menu">
          <img
            src={menu}
            alt="Ir a la carta"
            title="Llévame a la carta"
            style={{ width: "300px", cursor: "pointer" }}
          />
        </Link>
      </div>
    );
  }

  // Calcula el precio total del carrito
  const precioTotal = cart.reduce(
    (total, item) => total + item.cantidad * item.precio,
    0
  );

  // Elimina un plato del carrito
  const handleRemove = (id) => {
    const item = cart.find((item) => item.id === id);
    const message = `¿Estás seguro de que quieres eliminar "${item.nombre}" del carrito de compras?`;

    confirmAlert({
      title: "Confirmar eliminación",
      message: message,
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            removeFromCart(id);
            toast.success(`"${item.nombre}" eliminado del carrito`);
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
    });
  };

  // Vacía el carrito completo
  const handleClearCart = () => {
    confirmAlert({
      title: "Confirmar eliminación",
      message:
        "¿Estás seguro de que quieres eliminar TODOS los elementos del carrito de compras?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            clearCart();
            toast.success("Carrito vaciado");
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
    });
  };

  return (
    <Container fluid>
      <h4 className="text-center">Carrito de Compras</h4>
      <div className="table-responsive" id="carrito-table">
        <Table className="m-3" striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Plato</th>
              <th id="precio-column" style={{ width: precioWidth }}>
                Precio
              </th>
              <th id="cantidad-column" style={{ width: columnWidth }}>
                Cantidad
              </th>
              <th>Calorías</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="align-middle text-center">
                  <Image src={item.imagen} width="100" />
                </td>
                <td className="align-middle">{item.nombre}</td>
                <td className="align-middle">{formatCurrency(item.precio)}</td>
                <td className="align-middle">{item.cantidad}</td>
                <td className="align-middle">{item.calorias}</td>
                <td className="align-middle">
                  <Button
                    variant="outline-dark"
                    onClick={() => handleIncreaseQuantity(item.id)}
                    title="Aumentar cantidad"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleDecreaseQuantity(item.id)}
                    title="Disminuir cantidad"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleRemove(item.id)}
                    title="Eliminar plato"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="h5">
              <td colSpan="2" className="ps-5">
                Total a pagar
              </td>
              <td>{formatCurrency(precioTotal)}</td>
              <td>
                <Button variant="primary" title="Ir a Pagar" id="submit-button">
                  Ir a Pagar
                  <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleClearCart()}
                  title="Vaciar Carrito"
                >
                  Vaciar carrito
                  <FontAwesomeIcon icon={faTrashAlt} className="ms-1" />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
