import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/productlist';
import CartModal from './components/CartModal';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(window.innerWidth >= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [productNames, setProductNames] = useState([]);
  const [loading, setLoading] = useState(!products.length);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
        const names = data.map((product) => product.title);
        setProductNames(names);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (!products.length) {
          const fallbackProducts = [
            { id: 1, title: 'Toy Car', price: 10, image: 'https://via.placeholder.com/150' },
            { id: 2, title: 'Teddy Bear', price: 15, image: 'https://via.placeholder.com/150' },
            { id: 3, title: 'Puzzle Game', price: 8, image: 'https://via.placeholder.com/150' },
          ];
          setProducts(fallbackProducts);
          localStorage.setItem('products', JSON.stringify(fallbackProducts));
          const names = fallbackProducts.map((product) => product.title);
          setProductNames(names);
        }
        setLoading(false);
      }
    };

    if (!products.length) {
      fetchProducts();
    } else {
      const names = products.map((product) => product.title);
      setProductNames(names);
      setLoading(false);
    }

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      const newIsMobile = newWidth < 768;
      setIsCartOpen(!newIsMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Saved cartItems to localStorage:', cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log('Updated cartItems:', cartItems);
  }, [cartItems]);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const addToCart = (product) => {
    console.log('Adding product to cart:', product);
    console.log('Current cartItems before adding:', cartItems);

    if (!product || !product.id) {
      console.error('Product is missing or has no id:', product);
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setShowAlert(true);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, { ...product, quantity: 1 }];
      console.log('Updated cartItems after adding:', updatedItems);
      return updatedItems;
    });

    if (isMobile) {
      setIsCartOpen(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (isMobile) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleCart = () => {
    if (isMobile) {
      setIsCartOpen(!isCartOpen);
    }
  };

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  };

  const mainContentStyle = {
    flex: 1,
    padding: isMobile ? '10px' : '20px',
    marginRight: isMobile ? '0' : isTablet ? '250px' : '300px',
    marginLeft: '0',
    marginTop: '80px',
    transition: 'margin-right 0.3s ease-in-out',
    boxSizing: 'border-box',
    maxWidth: isMobile ? '100%' : isTablet ? 'calc(100% - 250px)' : 'calc(100% - 300px)',
  };

  const cartSidebarStyle = {
    position: 'fixed',
    right: isMobile ? 'auto' : '0',
    left: isMobile ? '50%' : 'auto',
    top: isMobile ? '50%' : '60px',
    width: isMobile ? '80%' : isTablet ? '250px' : '300px',
    maxWidth: isMobile ? '300px' : 'none',
    height: isMobile ? 'auto' : 'calc(100% - 60px)',
    backgroundColor: 'white',
    boxShadow: isMobile ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '-2px 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: isMobile ? '8px' : '0',
    padding: isMobile ? '10px' : '0',
    display: isMobile ? 'flex' : 'block',
    justifyContent: isMobile ? 'center' : 'normal',
    alignItems: isMobile ? 'center' : 'normal',
    transform: isMobile ? 'translate(-50%, -50%)' : 'none',
    transition: 'none',
    zIndex: 1000,
    overflowY: 'auto',
    visibility: isMobile && !isCartOpen ? 'hidden' : 'visible',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: isMobile && isCartOpen ? 'block' : 'none',
  };

  const alertOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  };

  const alertBoxStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '300px',
    width: '80%',
  };

  const alertMessageStyle = {
    fontSize: '16px',
    marginBottom: '15px',
    color: '#333',
  };

  const alertButtonStyle = {
    backgroundColor: '#ff6200',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar
          cartItemCount={cartItems.length}
          toggleCart={toggleCart}
          setSearchTerm={setSearchTerm}
          productNames={productNames}
        />
        <div style={overlayStyle} onClick={toggleCart}></div>
        <div style={mainContentStyle}>
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <div style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginTop: '20px' }}>
                    Loading...
                  </div>
                ) : (
                  <ProductList products={products} onAddToCart={addToCart} searchTerm={searchTerm} />
                )
              }
            />
          </Routes>
        </div>
        {(isMobile ? isCartOpen : true) && (
          <div style={cartSidebarStyle}>
            <CartModal
              cartItems={cartItems}
              onRemove={removeFromCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              windowWidth={windowWidth}
              toggleCart={toggleCart}
            />
          </div>
        )}
        {showAlert && (
          <div style={alertOverlayStyle}>
            <div style={alertBoxStyle}>
              <p style={alertMessageStyle}>Item already added to the cart</p>
              <button style={alertButtonStyle} onClick={handleAlertClose}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;