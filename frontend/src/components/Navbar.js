import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Slider from "../Screens/Slider";

const Navbar = ({ click, setcaty, category }) => {
    const [path, setpath] = useState("")
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const getCartCount = () => cartItems.reduce((qty, item) => qty + item.qty, 0)

    var nav = path === "/"
        ? "linear-gradient(black, rgba(0,0,0,0))"
        : "black";

    useEffect(() => {
        const path = setInterval(() => setpath(window.location.pathname), 100);
        return () => clearInterval(path);
    });

    return (
        <nav className="navbar" style={{ background: nav }}>
            <div className="navbar__logo">
                <img src="/Gimage/fa.ico" alt="logo" className="log" />
            </div>
            <ul className="navbar__links">
                {path === "/" &&
                    <li className="dropdown" >
                        <Link to="/" className="cart__link dropbtn" >Category</Link>
                        <div className="dropdown-content">
                            <div className="into-dropdown">
                                <div>
                                    <Link to="/cart" className="link">Cart</Link>
                                    <Link to="/" onClick={() => setcaty("all")} className="link">Shope</Link>
                                </div>
                                <div>

                                    {category.filter((el, index) => index % 2 === 0)
                                        .map((el, index) => <div key={index}> <Link to="/" className="link" onClick={() => { setcaty(el.category) }}>{el.category.toUpperCase()} </Link></div>)
                                    }
                                </div>
                                <div>
                                    {category.filter((el, index) => index % 2 !== 0)
                                        .map((el, index) => <div key={index}> <Link to="/" className="link" onClick={() => { setcaty(el.category) }}>{el.category.toUpperCase()} </Link></div>)
                                    }
                                </div>
                                <div>
                                    < Slider products={category} ind={category.length} caty={true} setcaty={setcaty} />
                                </div>
                            </div>
                        </div>
                    </li>
                }
                <li >
                    <Link to="/" className="cart__link" onClick={() => setcaty("all")} >
                        Shope
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="cart__link" >
                        <i className="fas fa-shopping-cart"></i>
                        <span className="adj" >
                            Cart
                            <span className="cartlogo__badge">{getCartCount()}</span>
                        </span>
                    </Link>
                </li>
            </ul>
            <div className="hamburger__menu" onClick={path !== "/login" ? click : () => window.location = "/"}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}
export default Navbar;