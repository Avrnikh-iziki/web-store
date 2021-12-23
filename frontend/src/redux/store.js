import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers'
import { getProductDetailReducer , getProductReducer } from './reducers/productReducer'
import {getCategoryReducer } from './reducers/categoryReducer'
const reducer = combineReducers({
 cart:cartReducer,
 getProducts : getProductReducer,
 getCategory:getCategoryReducer,
 getProductsDetails : getProductDetailReducer,
});
 const middleware = [thunk];
 const cartFromLocalStorage = localStorage.getItem("cart")? JSON.parse(localStorage.getItem('cart')):[] 
 const INITAIL_STATE = {
     cart : {
         cartItems : cartFromLocalStorage
     }
 }
 const  store = createStore(
     reducer,
     INITAIL_STATE,
     composeWithDevTools(applyMiddleware(...middleware))
 );

 export default store; 
 