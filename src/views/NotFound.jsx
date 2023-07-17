import { Link } from "react-router-dom";

import notFound from "../assets/img/not-found.svg";

export function NotFound() {
  return (
    <Link to="/menu">
      <div className="d-flex justify-content-center">
        <img
          src={notFound}
          alt="Página no encontrada"
          style={{ width: "400px", cursor: "pointer" }}
          title="Llévame a la carta"
        />
      </div>
    </Link>
  );
}












