import './CartScreen.css';
import CarteItem from '../components/CarteItem';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

import { addToCart, removeFomCart,resetCart } from '../redux/actions/cartActions';
import Popup from "../popup/Popup";
import Fotter from "../components/Fotter";


const CartScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const [show, setshow] = useState(false);

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, Number(qty)))
    }

    const removeFromeCart = (id) => {
        dispatch(removeFomCart(id))
    }

    const getcartCount = () => {
        return cartItems.reduce((qty, item) => item.qty + qty, 0)
    }

    const getCartSubTotale = () => {
        return cartItems.reduce((price, item) => {
            var coef = item.offre !==0 ?item.offre : item.price
             return coef * item.qty + price
        }, 0)
    }

    const resetcart = () => dispatch(resetCart())

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <div className="cartscreen">
                <div className="cartscreen__left">
                    {cartItems.length === 0
                        ? <div>
                            your cart is empty <Link to="/">Go Back</Link>
                        </div>
                        : cartItems.map(item => (
                            <CarteItem
                                key={item.product}
                                item={item}
                                qtyChangeHandler={qtyChangeHandler}
                                removeFromeCart={removeFromeCart} />
                        ))
                    }
                </div>
                
                <div className="cartscreen__right">
                    <div className="cartscreen__info">
                        <div style={{ borderBottom: "none" }} >
                            <div>Totals product</div>
                            <div>SubTotal</div>
                            <div>Tax - 5%</div>
                            <div>Shiping</div>
                            <div >Total</div>
                        </div>
                        <div>
                            <div>{getcartCount()}</div>
                            <div>{getCartSubTotale().toFixed(2)}$</div>
                            <div>{(Number(getCartSubTotale()) * 0.05).toFixed(2)}$</div>
                            <div>2$</div>
                            <div >{(Number(getCartSubTotale()) + Number(getCartSubTotale().toFixed(2) * 0.05) + 2).toFixed(2)}$</div>
                        </div>
                    </div>

                    <div>
                       {cartItems.length !== 0 && <button onClick={() => setshow(true)}> CHECK OUT </button>} 
                    </div>
                </div>
                <Popup show={show} setshow={setshow} cart={cartItems} resetcart={resetcart} />
            </div>
            <Fotter />
        </>
    )  
}

export default CartScreen