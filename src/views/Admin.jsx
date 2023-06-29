import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NuevoPlato } from '../components/NuevoPlato';
import { MostrarUsuarios } from '../components/MostrarUsuarios';
import { useNavigate } from 'react-router-dom';

export function Admin() {
  const [componenteActivo, setComponenteActivo] = useState(""); // Estado para controlar qué componente se muestra
  const navigate = useNavigate();

  const crearNuevoPlato = () => {
    setComponenteActivo("nuevoPlato");
  };

  const mostrarUsuariosRegistrados = () => {
    setComponenteActivo("mostrarUsuarios");
  };

  const volverAPerfil = () => {
    navigate("/perfil-usuario");
  };

  return (
    <div className='text-center'>
      <h3>Cuenta de Administrador</h3>
      <Button onClick={crearNuevoPlato} className='mt-2 mb-3'>Crear Nuevo Plato</Button>
      <Button onClick={mostrarUsuariosRegistrados} className='mt-2 mb-3 ms-3'>Mostrar Usuarios Registrados</Button>
      <Button onClick={volverAPerfil} className='mt-2 mb-3 ms-3'>Volver a mi perfil</Button>
      
      {componenteActivo === "nuevoPlato" && <NuevoPlato />}
      {componenteActivo === "mostrarUsuarios" && <MostrarUsuarios />}
    </div>
  );
}
