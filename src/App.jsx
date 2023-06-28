import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CarritoProvider } from "./context/CarritoContext";
import { UsuarioProvider } from "./context/UsuarioContext";
import { NavbarRestaurante } from "./components/NavbarRestaurante";
import { FooterRestaurante } from "./components/FooterRestaurante";
import { Home } from "./views/Home";
import { Menu } from "./views/Menu";
import { SobreNosotros } from "./views/SobreNosotros";
import { InicioSesion } from "./views/InicioSesion";
import { Registro } from "./views/Registro";
import { Carrito } from "./views/Carrito";
import { PerfilUsuario } from "./views/PerfilUsuario";
import { DetallePlato } from "./views/DetallePlato";
import { NotFound } from "./views/NotFound";
import { Admin } from "./views/Admin";
import { ModificarUsuario } from "./views/ModificarUsuario";
import PrivateRoute from "./helpers/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/app.css";

function Layout() {
  return (
    <div className="mq-margin-top-bottom">
      <NavbarRestaurante />
      <Routes>
        {/* Vistas Públicas */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/detalle-plato/:id" element={<DetallePlato />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />

        {/* Vistas privadas */}
        <Route path="/perfil-usuario" element={<PerfilUsuario />} />
        <Route path="/modificar-usuario" element={<ModificarUsuario />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* Not Found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <FooterRestaurante />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <UsuarioProvider>
        <CarritoProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </CarritoProvider>
      </UsuarioProvider>
    </BrowserRouter>
  );
}
