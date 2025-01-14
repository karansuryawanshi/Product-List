import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Undo2 } from "lucide-react";
import { Truck } from "lucide-react";
import { HandCoins } from "lucide-react";
import { Trophy } from "lucide-react";
import { LockKeyhole } from "lucide-react";

const API_URL = "https://api.escuelajs.co/api/v1/products";
// const API_URL = "'https://dummyjson.com/products'"

const ProductDetails = ({ updateCartCount }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((response) => {
      setProduct(response.data);
      if (response.data.images && response.data.images.length > 0) {
        const sanitizedImage = response.data.images[0].replace(/["[\]]/g, ""); // Removes ", [, and ]
        setSelectedImage(sanitizedImage);
      }
    });
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };
  console.log(selectedImage);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <div className="w-full lg:w-1/2">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-10/12 h-auto rounded-lg shadow-md"
          />

          <div className="flex gap-4 mt-4">
            {product.images.map((img, index) => {
              const sanitizedSubImg = img.replace(/["[\]]/g, "");
              return (
                <img
                  key={index}
                  src={sanitizedSubImg}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(sanitizedSubImg)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                    selectedImage === sanitizedSubImg
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {product.title}
          </h2>
          <p className="text-2xl text-red-600 font-bold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <div className="mb-4">
            <span className="text-gray-700 font-medium">Select Size:</span>
            <div className="flex gap-2 mt-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:bg-red-400 hover:text-white`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-red-600 text-white rounded-md shadow hover:bg-red-500 transition"
          >
            Add to Cart
          </button>
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              Available Offers:
            </h4>
            <ul className="list-disc ml-5 text-gray-600">
              <li>5% Unlimited Cashback on Credit Cards</li>
              <li>Flat $5 off on purchases over $100</li>
              <li>Special Price: Extra 25% off</li>
            </ul>
            <ul className="ml-5 mt-6 text-gray-600 list-none flex flex-wrap items-center justify-center gap-4">
              <li className="w-24 bg-red-300 p-2 rounded-md text-black text-center flex flex-col items-center justify-center">
                <Undo2 />
                <span className="text-xs">10 days Return & Exchange</span>
              </li>
              <li className="w-24 bg-red-300 p-2 rounded-md text-black text-center flex flex-col items-center justify-center">
                <HandCoins />
                <span className="text-xs">Cash/pay on delivery</span>
              </li>
              <li className="w-24 bg-red-300 p-2 py-4 rounded-md text-black text-center flex flex-col items-center justify-center">
                <Truck />
                <span className="text-xs">Free Delivery</span>
              </li>
              <li className="w-24 bg-red-300 p-2 py-4 rounded-md text-black text-center flex flex-col items-center justify-center">
                <Trophy />
                <span className="text-xs">Top Brand</span>
              </li>
              <li className="w-24 bg-red-300 p-2 rounded-md text-black text-center flex flex-col items-center justify-center">
                <LockKeyhole />
                <span className="text-xs">Secure transaction</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
