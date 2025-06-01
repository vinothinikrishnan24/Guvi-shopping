import React, { useState, useEffect } from 'react';

function Navbar({ cartItemCount, toggleCart, setSearchTerm, productNames }) {
  const taglines = [
    '🎉 Big Sale Today! 🎉',
    '🛒 Happy Shopping! 🛒',
    '✨ New Arrivals! ✨',
    '💖 Shop with Love! 💖',
    '🚚 Free Shipping! 🚚',
  ];

  const [currentTagline, setCurrentTagline] = useState(taglines[0]);
  const [fade, setFade] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * taglines.length);
        setCurrentTagline(taglines[randomIndex]);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = productNames.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
    padding: '10px 20px',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '60px',
    boxSizing: 'border-box',
    zIndex: 2000,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: "'Dancing Script', cursive",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    color: '#fff',
    flex: '0 0 auto',
  };

  const shopIconStyle = {
    marginRight: '8px',
    fontSize: '20px',
  };

  const taglineStyle = {
    flex: '1 1 auto',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    opacity: fade ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    margin: '0 10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const searchContainerStyle = {
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 10px',
  };

  const searchBarStyle = {
    padding: '6px',
    width: '100%',
    maxWidth: '200px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const suggestionsStyle = {
    position: 'absolute',
    top: '35px',
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '200px',
    zIndex: 1001,
  };

  const suggestionItemStyle = {
    padding: '6px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  suggestionItemStyle[':hover'] = {
    backgroundColor: '#f0f0f0',
  };

  const cartStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: '0 0 auto',
  };

  const cartIconStyle = {
    fontSize: '24px',
  };

  const cartCountStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-10px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  return (
    <div style={navbarStyle}>
      <div style={logoStyle}>
        <span style={shopIconStyle}>🛍️</span>
        Shopping App
      </div>
      <div style={taglineStyle}>
        {currentTagline}
      </div>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          style={searchBarStyle}
        />
        {suggestions.length > 0 && (
          <div style={suggestionsStyle}>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                style={suggestionItemStyle}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={cartStyle} onClick={toggleCart}>
        <span style={cartIconStyle}>🛒</span>
        {cartItemCount > 0 && (
          <span style={cartCountStyle}>{cartItemCount}</span>
        )}
      </div>
    </div>
  );
}

export default Navbar;