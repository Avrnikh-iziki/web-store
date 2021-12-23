import "./ProductScreen.css";
import './HomeScreen.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsDetails as ProductDerail } from '../redux/actions/productActions';
import { getProducts as listProducts } from "../redux/actions/productActions";
import { addToCart } from '../redux/actions/cartActions';
import Fotter from '../components/Fotter';
import Slider from "../Screens/Slider";
import Slider2 from "../Screens/Slider2";
import Loadingpopup from '../popup/Loadingpopup'


const ProductScreen = ({ match, history }) => {

    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const [change, setchange] = useState("Description");
    const [p, setp] = useState("")
    const [url, seturl] = useState("")
    const updateDimensions = () => {
        setWidth(window.innerWidth); 
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const productDetail = useSelector(state => state.getProductsDetails);
    const { loading2, error, product } = productDetail;

    useEffect(() => {
        if (product && match.params.id !== product._id) dispatch(ProductDerail(match.params.id))
    }, [dispatch, product, match])

    const getProducts = useSelector(state => state.getProducts);
    const { products, loading } = getProducts;
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1));
        history.push("/cart");
    }

    useEffect(() => {
        if (!loading2 && product.imageUrl !== undefined) {
            seturl(product)
            setp(product.imageUrl[0])
        }
    }, [product, loading2])

    const changeImage = (index) => {
        setp(product.imageUrl[index])
    }

    const images = (data) => {
        if (data) {
            return <>
                <div className="ap cover1"
                    style={{ backgroundImage: `url(${p})` }}>
                    <div className="into-cover1">
                    </div>
                </div>
                <div className="dow">
                    {data.imageUrl.map((el, index) => {
                        return <div
                            onClick={() => changeImage(index)}
                            key={index}
                            className="down2"
                            style={{ backgroundImage: `url(${data.imageUrl[index]})`, backgroundSize: "100% 100%" }}>
                        </div>
                    })}
                </div>
            </>
        } else { return "" }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <div>
            <div className="container mt-3">
                {
                    loading2
                        ? < Loadingpopup />
                        : error
                            ? <h2>{error}</h2>
                            : <>
                                <div className="card">
                                    <div className="warp">
                                        <div className="left">
                                            {
                                                images(url)
                                            }
                                        </div>
                                        <div className="right">
                                            <div className="right-black">
                                                <div className="header">
                                                    <h3>{product.name}</h3>
                                                    <h2 className="tit">${product.offre !== 0 ? product.offre : product.price}</h2>
                                                </div>
                                                <div className="product-main">
                                                    <div className="focus" >
                                                        <span>
                                                            <input
                                                                type="button"
                                                                value="Description"
                                                                onClick={() => setchange('Description')} />
                                                        </span>
                                                        <span>
                                                            <input
                                                                type="button"
                                                                value="Details"
                                                                onClick={() => setchange("Details")} />
                                                        </span>
                                                    </div>
                                                    {change === "Description"
                                                        ? <p>{product.description}</p>
                                                        : <div >

                                                            <table className="tab" >
                                                                <thead>
                                                                    <tr>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {product.details.map((el, index) => {
                                                                        return <tr key={index} >
                                                                            <td className="tee" style={{width:"20%"}}>{el.qty}</td>
                                                                            <td style={{width:"7%"}}></td>
                                                                            <td style={{width:"80%"}}>
                                                                                <ul className="te">
                                                                                    {el.value.split(",").map((l, i) => {
                                                                                        return <li  className="te"  key={i}>{l}</li>
                                                                                    })}
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="product-btns">
                                                    <button type="button"
                                                        onClick={addToCartHandler}
                                                        className="product-add">
                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </>
                }
            </div >

            {
                width < 430
                    ? <div className="befor-slid-gap container" >
                        <div className="slad-gap-in">
                            {(!loading && products !== undefined)&&
                                <Slider products={products} ind={products.length} />
                            }
                        </div> 
                    </div>
                    : (!loading && products !== undefined)&&
                    <Slider2 products={products} ind={products.length} width={width} />
            }

            <Fotter />
        </div >
    )
}
export default ProductScreen;
  