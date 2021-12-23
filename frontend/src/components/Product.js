import "./Product.css"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";

const Product = ({ imageUrl, name, price, productId, category, title, offre }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    return ( 
        <div className="product">
            <div style={{ backgroundImage: `url(${imageUrl[0]})` }} className="cover">
                <div className="into-vover"> </div>
            </div>
            <div className="product__info">
                <h4 className="info__name">{name}</h4>
                {width < 400 && <p className="ti">{title}</p>}
                <p>
                    {offre !== 0 ? <>
                        <span className="info__price" style={{ textDecoration: "line-through", marginRight: "7px" }}> {price} $</span>
                        <span className="info__price" style={{ color: "red", fontSize: "15px" }}>{offre} $ </span></>

                        : <span className="info__price" style={{ color: "red", fontSize: "15px" }}>{price} $ </span>}
                </p>
                <Link to={`/product/${productId}`} className="l">
                    <div className="info_button">  View </div>
                </Link>
            </div>
        </div>
    )
}

export default Product;