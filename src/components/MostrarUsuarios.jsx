import { useEffect, useState, useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import UsuarioContext from "../context/UsuarioContext";

export function MostrarUsuarios() {
  const { usuario } = useContext(UsuarioContext);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener todos los usuarios de la base de datos
    const obtenerUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://restaurante-4.vercel.app/usuarios/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(res.data);
      } catch (err) {
        setError("Error al obtener los usuarios");
      }
    };

    obtenerUsuarios();
  }, []);

  // Función para eliminar un usuario específico
  const eliminarUsuario = async (correo) => {
    // Busca el usuario a eliminar
    const user = usuarios.find((user) => user.correo === correo);

    // Configura el mensaje
    const message = `¿Estás seguro de que quieres eliminar a "${user.nombre}" correo "${user.correo}"?`;

    // Muestra la alerta de confirmación
    confirmAlert({
      title: "Confirmar eliminación",
      message: message,
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const token = localStorage.getItem("token");
              await axios.delete("https://restaurante-4.vercel.app/usuarios", {
                data: { correo },
                headers: { Authorization: `Bearer ${token}` },
              });
              setUsuarios(
                usuarios.filter((usuario) => usuario.correo !== correo)
              );
              toast.success(`"${user.nombre}" eliminado.`);
            } catch (err) {
              setError("Error al eliminar el usuario");
              toast.error("Error al eliminar el usuario");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
    });
  };

  // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
  if (!usuario) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      {error && <p>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.correo}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.direccion}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => eliminarUsuario(usuario.correo)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
