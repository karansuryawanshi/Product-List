# Product Listing App

This is a React application that fetches and displays products from the [Platzi Fake Store API](https://api.escuelajs.co/api/v1/products). The app features a functional user interface with product listing, filtering, sorting, a detailed view for each product, and a cart system.

## Features

### Core Features

- **Fetch and Display Products**
  - Displays product image, title, price, and category.
- **View Product Details**
  - Displays full product details including title, description, price, category, and a larger image.
- **Add to Cart**
  - Add products to a cart and display the total number of items in the cart.
  - View the cart with adjustable product quantities and total price calculation.

### Filters and Sorting

- **Search Bar**
  - Filter products by name.
- **Dropdown Filters**
  - Filter products by category.
- **Sorting Options**
  - Sort products by price (low to high, high to low) and rating (high to low).

## Tech Stack

- **React.js**: Front-end framework.
- **React Router**: For navigation and routing.
- **Axios**: To fetch data from the API.
- **TailwindCSS**: For styling.
- **Local Storage**: To persist cart data across page reloads.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd product-listing-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## Usage

1. **Product Listing**
   - Browse through the product catalog on the homepage.
2. **Filters and Sorting**
   - Use the search bar, category filter, and sorting options to customize the product view.
3. **Product Details**
   - Click on any product to view its detailed information.
4. **Add to Cart**
   - Click "Add to Cart" on a product to add it to your cart.
   - Navigate to the cart page to view or modify your selections.
5. **Cart Management**
   - Adjust prot quantities or remove products directly from the cart.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── ProductList.jsx
│   ├── ProductDetails.jsx
│   └── Cart.jsx
├── App.js
├── index.js
```

## API Reference

- [Platzi Fake Store API](https://api.escuelajs.co/api/v1/products)

## Future Enhancements

- Add user authentication.
- Implement payment gateway integration.
- Add pagination for product listing.

## License

This project is open-source and available under the [MIT License](LICENSE).
