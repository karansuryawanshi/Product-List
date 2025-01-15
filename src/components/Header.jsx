import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // State to manage the count of items in the cart
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // Effect to fetch cart data from local storage and calculate total quantity
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartCount]); // Dependency array ensures it runs when cartCount changes

  return (
    <header className="flex justify-between px-16 py-4 bg-gray-800 text-white">
      <Link to="/" className="font-bold text-3xl">
        Product Store
      </Link>

      {/* Shopping cart icon with item count */}
      <p onClick={() => navigate("/cart")} className="relative cursor-pointer">
        <p className="pr-3 flex mt-3 text-center gap-2">
          <ShoppingCart /> {/* Cart icon */}
        </p>
        {/* badge of cart items */}
        <span className="absolute top-0 right-10 bg-red-500 text-white text-xs px-2 rounded-full">
          {cartCount}
        </span>
      </p>
    </header>
  );
};

export default Header;
