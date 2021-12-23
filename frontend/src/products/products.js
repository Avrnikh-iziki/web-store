import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from "../redux/actions/productActions";
import { getCategory as listCategory } from "../redux/actions/categoryActions";

import Fotter2 from '../components/Fotter2';
import { withRouter } from 'react-router';
import Loadingpopup from '../popup/Loadingpopup'

const Product = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);


  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const categorys = useSelector(state => state.getCategory);
  const { category, loading1, error1 } = categorys

  useEffect(() => {
    dispatch(listCategory())
  }, [dispatch])

  const removeproduct = (id) => {
    dispatch(listProducts(id))
  }
  const [caty, setcaty] = useState('all');

  const prodV = (product) => {
    return <div key={product._id} className="my-product">
      <div className="be-image" style={{ backgroundImage: `url(${product.imageUrl[0]})` }}>
        <div className="details">
          <div className="buttons">
            <div>
              <Link to={`/update/${product._id}`}>
                <button className="deletbtn">
                  <i className="fas fa-edit"></i>
                </button>
              </Link>
            </div>
            <div>
              <button className="deletbtn" onClick={() => removeproduct(product._id)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/product/${product._id}`} className="name" >
        {product.name}
      </Link>
    </div>
  }

  const prod = (prod, loading, er) => {
    if (loading) return <Loadingpopup />
    else if (er) return <h2>{er}</h2>
    else {
      if (caty === "all") return prod.map(p => prodV(p))
      else return prod.filter(el => el.category === caty).map(p => prodV(p))
    }
  }

  const cat = (ca, loa, er) => {
    if (loa) return <Loadingpopup />
    else if (er) return <h1>{er}</h1>
    else {
      return ca.map((caty) => {
        return <div key={caty._id} className="cat-items" onClick={(e) => setcaty(caty.category)}>
          {caty.category}
        </div>
      })
    }
  }

  return (
    <div className="glob">
      {width > 480 &&
        <div className="top-but container">
          <Link to={`/category`}><h4> New Category </h4> </Link>
          <Link to={`/addproduct`} ><h4> New Product </h4></Link>
          <Link to={`/users`} > <h4> New User </h4> </Link>
          <Link to={`/companydetail`} ><h4>Company details</h4></Link>
          <Link to={`/employer`} > <h4>Epmloyer</h4> </Link>

        </div>}

      <div className="container cate" >
        {cat(category, loading1, error1)}
      </div>
      <div className="c">
        <div className="container co">
          {prod(products, loading, error)}
        </div>
      </div>
      <Fotter2 />
    </div>
  )
}

export default withRouter(Product)