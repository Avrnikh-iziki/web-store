import './HomeScreen.css'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts as listProducts } from "../redux/actions/productActions"
import Fotter from '../components/Fotter'
import Loadingpopup from '../popup/Loadingpopup'
const HomeScreen = ({ caty }) => {
    const dispatch = useDispatch();
    const [cat, setcat] = useState("")
    const getProducts = useSelector(state => state.getProducts);
    const { products, loading, error } = getProducts;
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const prod = (produc) => <Product
        key={produc._id}
        productId={produc._id}
        price={produc.price}
        name={produc.name}
        description={produc.description}
        imageUrl={produc.imageUrl}
        category={produc.category}
        title={produc.title}
        offre={produc.offre}
    />

    const logic = (p, i) => {

        var product2 = caty === "all"
            ? [...products].sort((a, b) => a.price - b.price)
            : [...products].filter(el => el.category === caty).sort((a, b) => a.price - b.price)

        var ids = caty === "all"
            ? [...products].map(el => el._id)
            : [...products].filter(el => el.category === caty).map(el => el._id)

        switch (cat) {
            case "":
                if (caty === p.category) return prod(p);
                if (caty === "all") return prod(p);
                break;
            case "up":
                if (product2[i]) {
                    if (ids.indexOf(p._id !== -1)) return prod(product2[i])
                }
                break;
            case "down":
                if (product2[i]) {
                    if (ids.indexOf(p._id !== -1)) return prod(product2.reverse()[i])
                }
                break;
            default:
                if (cat) {
                    if (caty === "all") {
                        if (p.name.toUpperCase().substring(0, cat.length) === cat.toUpperCase()) return prod(p)
                    }

                    if (caty === p.category) {
                        if (p.name.toUpperCase().substring(0, cat.length) === cat.toUpperCase()) return prod(p)
                    }
                }
        }
    }
    return <>
        <div className="first-image ">
            <div className="first-image-front">
            </div>
        </div>
        <div>
            <div className="container search">
                <div className="mt-1 mb-1 in"
                    onClick={() => setcat("up")}>
                    £ <i className="fa fa-level-up-alt"></i>
                </div>
                <div className="md-form mt-1 mb-1 i-search" >
                    <input className="form-control no-border text-center serch"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => setcat(e.target.value)} />
                </div>
                <div className="mt-1 mb-1 in"
                    onClick={() => setcat("down")}>
                    £ <i className="fa fa-level-down-alt"></i>
                </div>
            </div>

        </div>
        <div className=" container homescreen">
            <div className="homescreen__products ">
                {loading
                    ? <Loadingpopup />
                    : error
                        ? <h2>{error}</h2>
                        : products.map((product, index) => (
                            logic(product, index)
                        ))

                }
            </div>
        </div>
        < Fotter />
    </>
}

export default HomeScreen