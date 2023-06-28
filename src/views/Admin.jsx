import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NuevoPlato } from '../components/NuevoPlato';

export function Admin() {
  const [mostrarNuevoPlato, setMostrarNuevoPlato] = useState(false);

  // La función crearNuevoPlato ahora cambiará el estado de "mostrarNuevoPlato" que renderizará el componente NuevoPlato si es true o lo ocultará si es false
  const crearNuevoPlato = () => {
    setMostrarNuevoPlato(!mostrarNuevoPlato);
  };

  return (
    <div className='text-center'>
      <h3>Cuenta de Administrador</h3>
      <Button onClick={crearNuevoPlato} className='mt-2 mb-3'>Crear Nuevo Plato</Button>
      
      {/* Solo mostramos el componente NuevoPlato si "mostrarNuevoPlato" es verdadero */}
      {mostrarNuevoPlato && <NuevoPlato />}
    </div>
  );
}
