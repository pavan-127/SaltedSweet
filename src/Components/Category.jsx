import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import "./Category.css";

const useClickOutside = (handler) => {
    const domNode = useRef();

    
    const memoizedHandler = useCallback(handler, [handler]);

    useEffect(() => {
        const eventHandler = (event) => {
            if (domNode.current && !domNode.current.contains(event.target)) {
                memoizedHandler();
            }
        };
        document.addEventListener("mousedown", eventHandler);
        return () => {
            document.removeEventListener("mousedown", eventHandler);
        };
    }, [memoizedHandler]);
    return domNode;
};


function Category() {
    const cart = useSelector((state) => state.cart);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [currentLocation, setCurrentLocation] = useState("Select Location");
    
    const loggedInUser = localStorage.getItem("username") || null;

    const defaultLocations = [
        "Hyderabad, Telangana", "Bangalore, Karnataka", "Mumbai, Maharashtra",
        "Chennai, Tamil Nadu", "Delhi, NCT", "Pune, Maharashtra",
        "Kolkata, West Bengal", "Ahmedabad, Gujarat",
    ];

    const locationDropdownRef = useClickOutside(() => {
        setShowLocationDropdown(false);
    });

    const fetchCurrentLocation = useCallback(() => {
        setCurrentLocation("Fetching...");
        if (!navigator.geolocation) {
            setCurrentLocation("Not Supported");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || "Unknown";
                    const state = data.address.state || "Location";
                    setCurrentLocation(`${city}, ${state}`);
                } catch (error) {
                    setCurrentLocation("API Error");
                }
            },
            () => setCurrentLocation("Permission Denied")
        );
    }, []); 

    useEffect(() => {
        fetchCurrentLocation();
    }, [fetchCurrentLocation]);
    
    const handleSelectLocation = (location) => {
        setCurrentLocation(location);
        setShowLocationDropdown(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        navigate("/login"); 
    };

    const closeMobileMenu = () => setIsMenuOpen(false);

    return (
        <>
           
            <header className="navbar">
                <div className="navbar-container">
                    <Link className="navbar-brand " to="/home">
                        🍽️ Salted & Sweet
                    </Link>

                    <nav className="desktop-nav">
                        <Link className="nav-link" to="/home">Home</Link>
                        <Link className="nav-link" to="/veg-items">Veg</Link>
                        <Link className="nav-link" to="/non-veg-items">Non-Veg</Link>
                        <Link className="nav-link" to="/dessert">Desserts</Link>
                        <Link className="nav-link" to="/orders">Orders</Link>
                        <Link className="nav-link" to="/about-us">About Us</Link>
                        <Link className="nav-link" to="/contact-us">Contact Us</Link>
                        
                    </nav>

                    <div className="navbar-right">
                        <div ref={locationDropdownRef} className="location-container">
                            <button
                                className="location-button"
                                onClick={() => setShowLocationDropdown(prev => !prev)}
                            >
                                📍 {currentLocation.split(',')[0]}
                            </button>
                            {showLocationDropdown && (
                                <ul className="dropdown-menu">
                                    <li onClick={() => { fetchCurrentLocation(); setShowLocationDropdown(false); }}>🎯 Use Current Location</li>
                                    {defaultLocations.map((loc) => (
                                        <li key={loc} onClick={() => handleSelectLocation(loc)}>{loc}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {loggedInUser ? (
                            <div className="nav-user-info">
                                <span>Hi, {loggedInUser}</span>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </div>
                        ) : (
                            <Link className="nav-button" to="/login">Login</Link>
                        )}
                        <Link to="/cart" className="nav-button cart-button">
                            🛒 Cart
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>

                        <button
                            className={`hamburger ${isMenuOpen ? "open" : ""}`}
                            onClick={() => setIsMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <Link className="mobile-nav-link" to="/home" onClick={closeMobileMenu}>Home</Link>
                <Link className="mobile-nav-link" to="/veg-items" onClick={closeMobileMenu}>Veg</Link>
                <Link className="mobile-nav-link" to="/non-veg-items" onClick={closeMobileMenu}>Non-Veg</Link>
                <Link className="mobile-nav-link" to="/dessert" onClick={closeMobileMenu}>Desserts</Link>
                <Link className="mobile-nav-link" to="/orders" onClick={closeMobileMenu}>Orders</Link>
                <Link className="mobile-nav-link" to="/about-us" onClick={closeMobileMenu}>About Us</Link>
                <Link className="mobile-nav-link" to="/contact-us" onClick={closeMobileMenu}>Contact Us</Link>
            </div>
        </>
    );
}

export { Category };