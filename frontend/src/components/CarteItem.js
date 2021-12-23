import './CartItem.css';
import { Link } from 'react-router-dom';

export const CarteItem = ({ item, qtyChangeHandler, removeFromeCart }) => {
    return (
        <div className="carteitem ">
            <div className="cartitem__image">
                <img src={item.imageUrl[0]} alt={item.name} className="im" />
            </div>
            <div className="cartitem__name">
                <Link to={`/product/${item.product}`} className="lin-h">
                    {item.name}
                </Link>
            </div>
            <div className="cartitem__price">${item.offre !== 0 ? item.offre : item.price}</div>
            <select className="cartitem__select" value={item.qty} onChange={(e) => qtyChangeHandler(item.product, e.target.value)}>
                {[...Array(item.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option> 
                ))}
            </select>
            <div className="cartitem__price">${item.offre !== 0 ? item.offre * item.qty : item.price * item.qty}</div>
            <button className="cartitem__deletbtn" onClick={(e) => removeFromeCart(item.product)}>
                <i className="fa fa-trash"></i>
            </button>
        </div>
    )
}
export default CarteItem;