
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { getCategory as listCategory } from "../src/redux/actions/categoryActions"
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import Product from './products/products';
import Updateproduct from './products/Updateproduct';
import Addproduct from './products/Addproduct';
import Login from "./admin/Login";
import Routes from "./admin/Routes";
import userContext from './userContext';
import Category from './category/category';
import EditCategory from './category/edit';
import Users from './admin/users'
import Editusers from './admin/Edituser';
import Addcompany from './company/addcompany'
import Employer from './employer/employer'

function Ap() {
    const [isAuth, setisAuth] = useState(false);
    const categorys = useSelector(state => state.getCategory);
    const { category } = categorys
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listCategory())
    }, [dispatch])
    return (
        <Switch>
            <Route>
                <userContext.Provider
                    value={{ isAuth, setisAuth }}>
                    <Routes
                        exact
                        path="/login"
                        component={Login}
                        isAuth={!isAuth}
                        des="/product"
                    />

                    <Routes
                        exact
                        path="/category"
                        component={Category}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/editCategory/:id"
                        component={EditCategory}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/addproduct"
                        component={() => <Addproduct category={category} />}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/update/:id"
                        component={Updateproduct}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/product"
                        component={Product}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/users"
                        component={() => <Users u={isAuth} />}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/editusers/:id"
                        component={Editusers}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/companydetail"
                        component={Addcompany}
                        isAuth={isAuth}
                        des="/login"
                    />

                    <Routes
                        exact
                        path="/employer"
                        component={Employer}
                        isAuth={isAuth}
                        des="/login"
                    />

                </userContext.Provider>
            </Route>
        </Switch>
    )
}

export default Ap