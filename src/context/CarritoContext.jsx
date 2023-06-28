import { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [total, setTotal] = useState(() => {
    const storedTotal = localStorage.getItem("total");
    return storedTotal ? parseInt(storedTotal) : 0;
  });

  const MAX_PLATOS = 15;

  const addToCart = (menu) => {
    const existingItem = cart.find((item) => item.id === menu.id);
    let totalPlatos = existingItem ? existingItem.cantidad : 0;

    if (totalPlatos >= MAX_PLATOS) {
      return;
    }

    if (existingItem) {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.id === menu.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } else {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, { ...menu, cantidad: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const increaseQuantity = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    let totalPlatos = existingItem ? existingItem.cantidad : 0;

    if (totalPlatos >= MAX_PLATOS) {
      return false; // Devuelve false si se ha alcanzado el máximo
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    return true; // Devuelve true si el incremento es exitoso
  };

  const decreaseQuantity = (id) => {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem.cantidad <= 1) {
      return false; // Devuelve false si se ha alcanzado el mínimo
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    return true; // Devuelve true si la disminución es exitosa
  };
  //   const existingItem = cart.find((item) => item.id === id);
  //   let totalPlatos = existingItem ? existingItem.cantidad : 0;

  //   if (totalPlatos >= MAX_PLATOS) {
  //     return;
  //   }

  //   setCart((prevCart) => {
  //     const updatedCart = prevCart.map((item) =>
  //       item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
  //     );
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };

  // const decreaseQuantity = (id) => {
  //   setCart((prevCart) => {
  //     const updatedCart = prevCart.map((item) =>
  //       item.id === id && item.cantidad > 1
  //         ? { ...item, cantidad: item.cantidad - 1 }
  //         : item
  //     );
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.precio * item.cantidad;
    });
    setTotal(total);
    localStorage.setItem("total", total.toString());
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CarritoContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        clearCart,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
