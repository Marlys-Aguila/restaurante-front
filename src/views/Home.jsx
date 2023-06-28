import { useNavigate } from "react-router-dom";

import imgChevron from "../assets/img/arrow-right.svg";
import "../assets/styles/home.css";

export function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <main className="hero-img">
      <section id="text-background" onClick={handleClick} title="Ir a la carta">
        <h1>
          <span className="restaurante">Restaurante</span> <br />
          "Fogón de Memorias"
        </h1>
        <h3>Sabores que cuentan historias</h3>
      </section>

      <section className="menu-container" onClick={handleClick}>
        <img src={imgChevron} className="chevron" alt="Flecha" />
        <span className="carta">Ir a la carta</span>
      </section>
    </main>
  );
}
