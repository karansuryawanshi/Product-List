import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartCount]);

  return (
    <header className="flex justify-between px-16 py-4 bg-gray-800 text-white">
      <Link to="/" className="font-bold text-3xl">
        Product Store
      </Link>
      <Link to="/cart" className="relative">
        <p className="pr-3 flex mt-3 text-center gap-2">
          <ShoppingCart />
        </p>
        <span className="absolute top-0 right-10 bg-red-500 text-white text-xs px-2 rounded-full">
          {cartCount}
        </span>
      </Link>
    </header>
  );
};

export default Header;
