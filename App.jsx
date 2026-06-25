import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      id: 2,
      name: "Smart Phone",
      price: 20000,
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 8000,
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    },
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>🛒 Smart E-Commerce Store</h1>

        <div className="cart-badge">
          Cart ({cart.reduce((a, b) => a + b.qty, 0)})
        </div>
      </header>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="products">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.category}</p>

            <h4>₹{product.price}</h4>

            <button onClick={() => addToCart(product)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>No Products Added</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <span>
                {item.name} - ₹{item.price}
              </span>

              <div>
                <button onClick={() => decreaseQty(item.id)}>
                  -
                </button>

                <span>{item.qty}</span>

                <button onClick={() => increaseQty(item.id)}>
                  +
                </button>
              </div>
            </div>
          ))
        )}

        <h2>Total : ₹{total}</h2>
      </div>
    </div>
  );
}

export default App;