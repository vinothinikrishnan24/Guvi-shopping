import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CartModal({ cartItems, onRemove, onIncrease, onDecrease, windowWidth, toggleCart }) {
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  console.log('Cart Items:', cartItems);

  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0 && countdown === 0) {
      toggleCart();
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 100);
    }
  }, [cartItems, countdown, toggleCart, navigate]);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const cartContainerStyle = {
    padding: isMobile ? '15px' : isTablet ? '10px' : '15px',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: isMobile ? '#f9f9f9' : 'transparent',
    borderRadius: isMobile ? '8px' : '0',
    overflowX: 'hidden',
  };

  const cartItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: isMobile ? '8px' : '10px',
    borderBottom: '1px solid #ddd',
    gap: '12px',
    maxWidth: '100%',
  };

  const itemContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 100%',
    gap: '10px',
    maxWidth: '100%',
  };

  const itemImageStyle = {
    width: isMobile ? '50px' : isTablet ? '50px' : '60px',
    height: isMobile ? '50px' : isTablet ? '50px' : '60px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const itemDetailsStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontSize: isMobile ? '14px' : isTablet ? '14px' : '16px',
    color: '#333',
    overflowWrap: 'break-word',
  };

  const itemNameStyle = {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '4px',
  };

  const itemPriceStyle = {
    color: '#333',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    maxWidth: '100%',
    justifyContent: isMobile || isTablet ? 'flex-start' : 'space-between',
    width: '100%',
  };

  const quantityContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const quantityButtonStyle = {
    backgroundColor: '#ff6200',
    color: 'white',
    border: 'none',
    padding: isMobile || isTablet ? '4px 8px' : '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: isMobile || isTablet ? '12px' : '16px',
    lineHeight: '1',
  };

  const quantityDisplayStyle = {
    margin: '0 5px',
    fontSize: isMobile || isTablet ? '12px' : '16px',
    color: '#333',
  };

  const removeButtonStyle = {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    padding: isMobile || isTablet ? '4px 8px' : '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    lineHeight: '1',
  };

  const emptyCartStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#666',
    padding: '20px',
    fontSize: isMobile || isTablet ? '14px' : '16px',
    gap: '10px',
  };

  const emptyCartImageStyle = {
    width: isMobile ? '100px' : '150px',
    height: 'auto',
    marginBottom: '10px',
  };

  const cartTitleStyle = {
    fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
    color: '#333',
  };

  const totalPriceStyle = {
    fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
    fontWeight: 'bold',
    color: '#ff6200',
    margin: '15px 0',
    padding: '10px',
    borderTop: '2px solid #ddd',
    textAlign: 'center',
  };

  const closeButtonStyle = {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.2s',
    animation: 'bounce 0.5s ease-in-out',
  };

  closeButtonStyle[':hover'] = {
    backgroundColor: '#555',
    transform: 'scale(1.05)',
  };

  const bounceKeyframes = `
    @keyframes bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <div style={cartContainerStyle}>
      <style>{bounceKeyframes}</style>
      <h2 style={cartTitleStyle}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div style={emptyCartStyle}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            style={emptyCartImageStyle}
          />
          <p>
            {isMobile
              ? `Your cart is empty. Redirecting to home page in ${countdown}...`
              : 'Your cart is empty.'}
          </p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={cartItemStyle}>
              <div style={itemContainerStyle}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={itemImageStyle}
                  />
                ) : (
                  <div style={{ ...itemImageStyle, backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>No Image</span>
                  </div>
                )}
                <div style={itemDetailsStyle}>
                  <span style={itemNameStyle}>{item.title ? item.title.slice(0, 20) + '...' : 'Unknown Item'}</span>
                  <span style={itemPriceStyle}>₹{item.price || '0'}</span>
                </div>
              </div>
              <div style={buttonContainerStyle}>
                <div style={quantityContainerStyle}>
                  <button
                    style={quantityButtonStyle}
                    onClick={() => onDecrease(item.id)}
                  >
                    -
                  </button>
                  <span style={quantityDisplayStyle}>{item.quantity || 1}</span>
                  <button
                    style={quantityButtonStyle}
                    onClick={() => onIncrease(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  style={removeButtonStyle}
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={totalPriceStyle}>
            Total: ₹{totalPrice.toFixed(2)}
          </div>
        </>
      )}
      {isMobile && cartItems.length > 0 && (
        <button
          style={closeButtonStyle}
          onClick={toggleCart}
        >
          Close
        </button>
      )}
    </div>
  );
}

export default CartModal;