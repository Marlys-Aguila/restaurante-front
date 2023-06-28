import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { CarritoContext } from "../context/CarritoContext";
import { CardMenu } from "../components/CardMenu";

import "../assets/styles/menu.css";

export function Menu() {
  const { cart, addToCart } = useContext(CarritoContext);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetch("https://restaurante-4.vercel.app/menus")
      .then((response) => response.json())
      .then((data) => setMenuData(data));
  }, []);

  const isPlatoInCart = (platoId) => {
    return cart.some((item) => item.id === platoId);
  };

  // Para el botón de scroll to top
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
    <Container className="my-3 container">
      <h3 className="mb-4">Elige tu menú:</h3>
      <div className="row g-3 justify-content-center">
        {menuData.map((menu) => (
          <div key={menu.id} className="col-12 col-sm-6 col-lg-4">
            <CardMenu
              menu={menu}
              addToCart={addToCart} 
              isAdded={isPlatoInCart(menu.id)}
            />
          </div>
        ))}
      </div>

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
