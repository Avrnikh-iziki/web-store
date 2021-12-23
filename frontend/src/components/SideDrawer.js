import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


const SideDrawer = ({ show, click, setcaty, category }) => {
    const sideDrawerClass = ["sidedrawer"]
    if (show) sideDrawerClass.push("show");
    const [path, setpath] = useState("/")
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const getCartCount = () => cartItems.reduce((qty, item) => qty + item.qty, 0);

    useEffect(() => {
        const path = setInterval(() => setpath(window.location.pathname), 100);
        return () => clearInterval(path);
    });
    const pathRegex = new RegExp(/\/product\/\w+/g)

    return (
        <div className={sideDrawerClass.join(" ")}>
            <ul className="sidedrawer__links" >
                <li onClick={click}>
                    <Link to='/' onClick={() => setcaty("all")}>
                        <i className="fa fa-home"></i>
                        <span>
                            Shop
                        </span>
                    </Link>
                </li>
                {(path === "/" || pathRegex.test(path) || path === "/cart" || path === "/company") &&
                    <li onClick={click}>
                        <Link to='/cart'>
                            <i className="fa fa-shopping-cart"></i>
                            <span>
                                Cart <span className="sidedrawer__cartbadge">{getCartCount()}</span>
                            </span>
                        </Link>
                    </li>
                }
                {
                    path === "/" &&
                    <li className="dropdown1" style={{ background: "transparent" }} >
                        <div className="title">
                            <span className="li">
                                <i className="fa fa-list"></i>
                                <span>Category</span>
                            </span>
                        </div>
                        <div className="dropdown-content1" aria-haspopup="true" onClick={click}>
                            {category !== undefined &&
                                category.map((el, index) => <div key={index} onClick={() => { setcaty(el.category) }}>{el.category}</div>)
                            }
                        </div>
                    </li>
                }
                {
                    path === "/product" &&
                    <li className="dropdown1" style={{ background: "transparent" }} >
                        <div className="title">
                            <span className="li">
                                <i className="fa fa-plus-square"></i>
                                <span>Category</span>
                            </span>
                        </div>
                        <div className="dropdown-content1" aria-haspopup="true" onClick={click}>
                            <div><Link to={`/category`} className="lin"><i className="fas fa-plus"></i><span className="eq">Category</span> </Link> </div>
                            <div><Link to={`/addproduct`} className="lin"><i className="fas fa-plus"></i><span className="eq">Product</span></Link></div>
                            <div><Link to={`/companydetail`} className="lin"> <i className="fas fa-plus"></i> <span>Company</span></Link></div>
                            <div><Link to={`/employer`} className="lin"> <i className="fas fa-plus"></i> <span>Employer</span></Link></div>
                            <div><Link to={`/users`} className="lin"> <i className="fas fa-user-plus"></i> <span>User</span></Link></div>
                        </div>
                    </li>
                }
                {
                    (/(\/users)|(\/category)|(\/addproduct)|(\/companydetail)|(\/employer)|(editCategory\/.?)|(update\/.?)|(editusers\/.?)/.test(path)) &&
                    <li
                        className="dropdown1"
                        style={{ background: "transparent" }} >
                        <div className="title"
                            style={{ background: "orange" }}
                            onClick={click} >
                            <span className="li">
                                <Link
                                    to="/product">
                                    <i className="fas fa-undo-alt"></i>
                                    <span className="li_l">Return</span>
                                </Link>
                            </span>
                        </div>
                    </li>
                }
            </ul>
        </div>
    )
}
export default SideDrawer;