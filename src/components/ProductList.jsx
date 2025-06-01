import React, { useState, useEffect } from 'react';


function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ProductList({ products, onAddToCart, searchTerm }) {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = shuffleArray(products);
      setShuffledProducts(shuffled);
      setFilteredProducts(shuffled);
    }
  }, [products]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(shuffledProducts);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = shuffledProducts.filter((product) =>
      product.title.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, shuffledProducts]);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile
      ? '1fr'
      : isTablet
        ? 'repeat(2, 1fr)'
        : 'repeat(3, 1fr)',
    gap: isMobile ? '10px' : '20px',
    padding: '0',
  };

  const noResultsStyle = {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    marginTop: '20px',
  };

  return (
    <div>
      {filteredProducts.length === 0 && searchTerm ? (
        <div style={noResultsStyle}>No products found</div>
      ) : (
        <div style={productGridStyle}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={productCardStyle}>
              <img
                src={product.image}
                alt={product.title}
                style={productImageStyle}
              />
              <h3 style={productTitleStyle}>{product.title}</h3>
              <p style={productPriceStyle}>₹{product.price}</p>
              <button
                style={addToCartButtonStyle}
                onClick={() => {
                  console.log('Add to Cart clicked for product:', product);
                  onAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const productCardStyle = {
  border: '2px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
};

productCardStyle[':hover'] = {
  transform: 'scale(1.05)',
};

const productImageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'contain',
  marginBottom: '10px',
};

const productTitleStyle = {
  fontSize: '16px',
  margin: '10px 0',
  color: '#333',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  lineHeight: '1.4',
};

const productPriceStyle = {
  fontSize: '14px',
  color: '#007bff',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const addToCartButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'background-color 0.3s',
};

addToCartButtonStyle[':hover'] = {
  backgroundColor: '#218838',
};

export default ProductList;