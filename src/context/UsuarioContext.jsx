import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUsuarioData();
    }
  }, []);

  const registrarUsuario = async (nuevoUsuario) => {
    const urlServer = "https://restaurante-4.vercel.app";
    const endpoint = "/usuarios";
    // console.log(nuevoUsuario);
    try {
      const response = await axios.post(urlServer + endpoint, nuevoUsuario);

      if (response.status === 201) {
        alert("Usuario registrado con éxito");
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(`Algo salió mal... ${error.message}`);
      console.log(error);
    }
  };

  const iniciarSesion = async (credenciales) => {
    const urlServer = "https://restaurante-4.vercel.app";
    const endpoint = "/usuarios/login";
    // console.log(credenciales);
    try {
      const response = await axios.post(urlServer + endpoint, credenciales);

      if (response.status === 200) {
        const token = response.data.token;
        // Almacena el token en localStorage
        localStorage.setItem("token", token);
        // Almacena el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        setUsuario(response.data.usuario);

        alert("Usuario identificado con éxito");
        // console.log("Response data: ", response.data);
        navigate("/perfil-usuario");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(`Algo salió mal... ${error.message}`);
      console.log(error);
    }
  };

  // Obtiene los datos del usuario desde el servidor y los almacena en el estado 'usuario'
  const getUsuarioData = async () => {
    const urlServer = "https://restaurante-4.vercel.app";
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");

    // Si no hay token, no se puede obtener la información del usuario
    // Esto quiere decir que solo un usuario autenticado puede obtener su información
    try {
      // console.log("Token: ", token);
      const response = await axios.get(urlServer + endpoint, {
        // Agrega el token a la cabecera de la solicitud
        headers: { Authorization: "Bearer " + token },
      });

      if (response.status === 200) {
        const usuarioData = response.data;
        setUsuario(usuarioData);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarSesion = () => {
    // borra al usuario del localstorage estableciendo su valor a null
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/login");
  };

  // Actualiza los datos del usuario en el servidor. Solo lo puede realizar el mismo usuario, porque requiere autenticación (su token guardado en el localStorage)
  const actualizarUsuario = async (usuarioActualizado) => {
    const urlServer = "https://restaurante-4.vercel.app";
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");

    if (!usuario || !usuario.id) {
      alert("El usuario no está definido");
      return;
    }

    // Accede al id del usuario desde el estado 'usuario'
    const userId = usuario.id;

    try {
      const response = await axios.put(
        `${urlServer}${endpoint}/${userId}`,
        usuarioActualizado,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert(`Usuario ${usuario.correo} actualizado con éxito`);
        setUsuario(response.data);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(`Algo salió mal... ${error.message}`);
      console.log(error);
    }
  };

  const value = {
    usuario,
    registrarUsuario,
    iniciarSesion,
    getUsuarioData,
    cerrarSesion,
    actualizarUsuario,
  };

  return (
    <UsuarioContext.Provider value={value}>{children}</UsuarioContext.Provider>
  );
};

export default UsuarioContext;
