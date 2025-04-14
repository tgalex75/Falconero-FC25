import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchDataDB = async () => {
    let { data: registroimprevisti, error } = await supabase
      .from("registroimprevisti")
      .select("*");
      error && console.log("error: ", error);
      setCartItems(registroimprevisti ? registroimprevisti : [])
  };

  useEffect(() => {
    fetchDataDB()
  },[])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.title === item.title,
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
      updateValueDBAdd(item, isItemInCart);
    } else {
      setCartItems([...cartItems, { ...item }]);
      insertItem(item);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.title === item.title,
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.title !== item.title),
      );
      removeItem(item);
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
      updateValueDBDel(item, isItemInCart);
    }
  };

  const insertItem = async (impr) => {
    const { error } = await supabase
      .from("registroimprevisti")
      .insert([{ title: impr.title, quantity: impr.quantity }])
      .select();
    error && console.log("error: ", error);
  };

  const removeItem = async (element) => {
    const { error } = await supabase
      .from("registroimprevisti")
      .delete()
      .eq("id", element.id);
    error && console.log(error);
    fetchDataDB()
  };

  const deleteListDB = async () => {
    const { error } = await supabase
      .from("registroimprevisti")
      .delete()
      .neq("title", -1);
    error && console.log(error);
  };

  const updateValueDBAdd = async (item, itemQuantity) => {
    const { error } = await supabase
      .from("registroimprevisti")
      .update({
        quantity: itemQuantity.quantity === 3 ? 3 : itemQuantity.quantity + 1,
      })
      .eq("title", item.title)
      .select();
      error && console.log("error: ", error);
    };

  const updateValueDBDel = async (item, itemQuantity) => {
    const { error } = await supabase
      .from("registroimprevisti")
      .update({ quantity: itemQuantity.quantity - 1 })
      .eq("title", item.title)
      .select();
      error && console.log("error: ", error);
    };

  const clearCart = () => {
    setCartItems([]);
    deleteListDB();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
