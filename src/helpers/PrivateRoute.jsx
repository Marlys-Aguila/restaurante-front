import { useContext } from "react";
import UsuarioContext from "../context/UsuarioContext";

function PrivateRoute({ children }) {
  const { usuario } = useContext(UsuarioContext);

  // Si el usuario existe y es administrador, renderizamos el componente hijo, que es <Admin />
  return usuario && usuario.rol === "Administrador" && children;
}

export default PrivateRoute;
