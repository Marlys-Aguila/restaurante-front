import { useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode"; // jwtDecode decodifica el token y obtiene la fecha de expiración
import { CSSTransition } from "react-transition-group"; // CSSTransition es un componente que permite agregar animaciones CSS a los componentes de React
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { CarritoContext } from "../context/CarritoContext";
import UsuarioContext from "../context/UsuarioContext";

import favicon from "/favicon.svg";
import "../assets/styles/navbar.css";

export function NavbarRestaurante() {
  const { cart } = useContext(CarritoContext);
  const { usuario } = useContext(UsuarioContext);

  // nodeRef referencia al nodo del elemento que se animará con CSSTransition (el número de notificaciones del carrito)  
  // para que no se renderice en el DOM hasta que se cumpla la condición de que el carrito tenga al menos un producto agregado (cart.length > 0) 
  // y se ejecute la animación de entrada (in={cart.length > 0}) y de salida (unmountOnExit) del elemento que se animará
  const nodeRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // decodifica el token y obtiene la fecha de expiración
      const dateNow = new Date();
  
      // Verifica si el token ha expirado
      if (decodedToken.exp < dateNow.getTime() / 1000) { // getTime() devuelve el tiempo en milisegundos, por eso se divide por 1000
        console.log("Token ha expirado.");
        localStorage.removeItem("token"); // Elimina el token del localStorage
      }
    }
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      id="custom-color-navbar"
    >
      <Container className="d-flex flex-row justify-content-center">
        <Navbar.Brand as={Link} to="/home" id="pointer" title="Ir a Home">
          <img
            alt=""
            src={favicon}
            width="40"
            height="40"
            className="d-inline-block align-center me-1 mb-2"
          />{" "}
          <div className="d-inline-block align-center">Fogón de Memorias</div>
        </Navbar.Brand>

        <section className="ms-3">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/menu" className="menu-link">
                Carta
              </Nav.Link>
              <Nav.Link as={Link} to="/sobre-nosotros" className="menu-link">
                Sobre Nosotros
              </Nav.Link>
              {usuario ? (
                <Nav.Link as={Link} to="/perfil-usuario" className="menu-link">
                  Mi Perfil
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="menu-link">
                    Inicia Sesión
                  </Nav.Link>
                  <Nav.Link as={Link} to="/registro" className="menu-link">
                    Regístrate
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav.Link as={Link} to="/carrito" className="nav-link-wrapper pe-5">
              <FontAwesomeIcon
                icon={faShoppingCart}
                color="white"
                size="lg"
                title="Ir al carrito"
                className="ms-2"
              />
              <CSSTransition
                in={cart.length > 0}
                timeout={500}
                classNames="cart-notification"
                unmountOnExit
                nodeRef={nodeRef}
              >
                <div className="cart-notification" ref={nodeRef}>
                  {cart.length}
                </div>
              </CSSTransition>
            </Nav.Link>
          </Navbar.Collapse>
        </section>
      </Container>
    </Navbar>
  );
}
