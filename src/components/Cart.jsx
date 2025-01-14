import React, { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(cart);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center border p-2 gap-4 sm:gap-6 rounded-lg hovver:bg-[#e0e0e0] hover:shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] duration-300"
          >
            {/* Image */}
            <div className="w-12 sm:w-16">
              <img
                src={
                  typeof item.images[0] === "string"
                    ? item.images[0].replace(/^\[\"|\"\]$/g, "")
                    : item.images[0]
                }
                alt={item.title}
                className="w-full h-auto rounded-md cursor-pointer"
                onClick={() => {
                  navigate("/product/" + item.id);
                }}
              />
            </div>

            {/* Title */}
            <h2
              className="text-lg font-bold flex-1 min-w-[150px] sm:w-3/12 truncate cursor-pointer"
              onClick={() => {
                navigate("/product/" + item.id);
              }}
            >
              {item.title}
            </h2>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 sm:w-4/12 justify-center">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
              >
                +
              </button>
            </div>

            {/* Price */}
            <p className="w-auto sm:w-2/12 text-center text-xl font-semibold">
              $ {item.price * item.quantity}
            </p>

            {/* Remove Item */}
            <div className="w-auto sm:w-2/12 flex justify-center">
              <button
                onClick={() => removeItem(item.id)}
                className="cursor-pointer flex bg-red-200 p-2 rounded-full text-red-600 hover:bg-red-300"
              >
                <CircleX />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="flex mt-4 justify-between items-center">
        <h2 className="text-xl font-bold ">Total:${totalPrice}</h2>
        <button
          className={`bg-blue-600 text-white rounded-lg duration-300 px-4 py-2 ${
            cart.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600/80"
          }`}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
