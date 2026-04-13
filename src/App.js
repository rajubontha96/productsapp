import {useEffect, useState} from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 className="center">Loading...</h1>;
  }

  // Product Details View
  if (selectedProduct) {
    return (
      <div className="details-container">
        <button
          className="back-btn"
          onClick={() => setSelectedProduct(null)}
        >
          ← Back
        </button>

        <div className="details-card">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
          />

          <div className="info">
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <h3>₹ {selectedProduct.price}</h3>
            <p className="category">
              Category: {selectedProduct.category}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Products Grid View
  return (
    <div className="container">
      <h1 className="title">Products</h1>

      <div className="grid">
        {products.map(product => (
          <div
            key={product.id}
            className="card"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;