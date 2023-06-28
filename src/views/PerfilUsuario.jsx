import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UsuarioContext from "../context/UsuarioContext";

export function PerfilUsuario() {
  const { usuario, getUsuarioData, cerrarSesion } = useContext(UsuarioContext);
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasFetched) {
      getUsuarioData();
      setHasFetched(true);
    }
  }, [hasFetched, getUsuarioData]);

  const goToAdmin = () => {
    navigate("/admin");
  };

  const goToModificarUsuario = () => {
    navigate("/modificar-usuario");
  };

  const confirmarCerrarSesion = () => {
    confirmAlert({
      title: "Confirmar cierre de sesión",
      message: "¿Estás seguro de que quieres cerrar tu sesión?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            cerrarSesion();
            toast.success("Has cerrado la sesión exitosamente.");
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Se canceló el cierre de sesión"),
        },
      ],
    });
  };

  if (!usuario) {
    return <h5 className="py-5 text-center">Usuario no autenticado</h5>;
  }

  return (
    <div className="text-center container">
      <h3>
        Bienvenido <span className="fw-bold">{usuario.nombre}</span>
      </h3>
      <h5>Rol: {usuario.rol}</h5>
      <section className="d-flex flex-column justify-content-center align-items-center gap-2">
        {usuario.rol === "Administrador" && (
          <Button onClick={goToAdmin}>Ir a mi cuenta de Administrador</Button>
        )}
        <Button onClick={goToModificarUsuario}>Modificar mis Datos</Button>
        <Button onClick={confirmarCerrarSesion}>Cerrar Sesión</Button>
      </section>
    </div>
  );
}
