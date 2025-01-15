import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API URL to fetch products
const API_URL = "https://api.escuelajs.co/api/v1/products";

const ProductList = () => {
  // Function to clean image URLs by removing unwanted characters
  const cleanImageURL = (imageLink) => {
    const cleanedLink = imageLink.replace(/["[\]]/g, ""); // Removes brackets and quotes
    return cleanedLink;
  };

  // State variables for managing products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetches products from the API on component mount
  useEffect(() => {
    axios
      .get(API_URL) // Fetches products data
      .then((response) => {
        console.log("response", response.data);
        const cleanedProducts = response.data.map((product) => {
          return {
            ...product,
            images: product.images.map((image) => cleanImageURL(image)), // Clean each image URL
          };
        });

        setProducts(cleanedProducts); // Stores product data
        setFilteredProducts(cleanedProducts); // Initializes filtered data
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Filtering logic
    let filtered = products.filter(
      (product) => product.title.toLowerCase().includes(search.toLowerCase()) // Filters by search query
    );

    if (category) {
      filtered = filtered.filter(
        (product) => product.category.name === category // Filters by selected category
      );
    }
    // Sorting logic
    if (sortOption === "price-low-high") {
      filtered.sort((a, b) => a.price - b.price); // Sorts by price (low to high)
    } else if (sortOption === "price-high-low") {
      filtered.sort((a, b) => b.price - a.price); // Sorts by price (high to low)
    } else if (sortOption === "rating-high-low") {
      filtered.sort((a, b) => b.rating - a.rating); // Sorts by rating (high to low)
    }

    setFilteredProducts(filtered);
  }, [search, category, sortOption, products]);

  // Displays a loading spinner while data is being fetched
  if (loading) {
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
  }

  return (
    <div className="p-4">
      {/* Search and filter UI */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Product Serch */}
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-4 rounded-lg border-slate-800 px-2 py-1 focus:outline-none"
        />
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Updates category filter
          className="border-4 rounded-lg border-slate-800 px-2 py-1"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Shoes">Shoes</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothes">Clothes</option>
        </select>
        {/* Sorting options */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} // Updates sorting option
          className="border-4 rounded-lg border-slate-800 px-2 py-1"
        >
          <option value="">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating-high-low">Rating: High to Low</option>
        </select>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="hover:scale-105 transition-transform duration-300 border p-4 rounded-[10px] hover:border border-gray-500 hover:border-gray-800 bg-[#e0e0e0] hover:shadow-[5px_5px_30px_#bebebe,-5px_-5px_10px_#ffffff]"
          >
            {/* Product image */}
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            {/* Product title */}
            <h2 className="text-lg font-bold mt-2">{product.title}</h2>
            {/* product price */}
            <p>
              Price:{" "}
              <span className="text-red-500 font-semibold">
                ${product.price}
              </span>
            </p>
            {/* product description */}
            <p>Description: {product.description.slice(0, 25)}...</p>
            {/* product category name */}
            <p>Category: {product.category.name}</p>
            {/* Navigates to product details page */}
            <p
              onClick={() => navigate("/product/" + product.id)}
              className="text-blue-500 cursor-pointer"
            >
              View Details
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
