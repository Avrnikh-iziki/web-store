import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getCategory as listCategory } from "../src/redux/actions/categoryActions"
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import NaveScreen from "./Screens/NaveScreen";
import Company from './Screens/company';
import Ap from './Ap';
//import Register from "./admin/Register";

function App() {

  const [caty, setcaty] = useState("all");
  const categorys = useSelector(state => state.getCategory);
  const { category } = categorys;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory())
  }, [dispatch])
  var path = ["/company", "/cart", "/product/:id", "/", "/login", "/product"].indexOf(window.location.pathname)

  return (
    <Router>
      <main>
        <NaveScreen
          setcaty={setcaty}
          category={category} />

        <Switch>
          <Route
            exact
            path="/"
            component={() => < HomeScreen caty={caty} />} />

          <Route
            exact
            path="/product/:id"
            component={ProductScreen} />

          <Route
            exact
            path="/cart"
            component={CartScreen} />

          <Route
            exact
            path="/company"
            component={Company} />

          {path !== -1
            ? <Route path="" component={Ap} />
            : <Redirect to="/" />
          }
        </Switch>
      </main>
    </Router>
  );
}

export default App;
