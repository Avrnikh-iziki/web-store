import * as actionTyps from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/prodcuts/${id}`)
    dispatch({
        type: actionTyps.ADD_TO_CART,
        payload: {
            product: data._id,
            category:data.category,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            countInStock: data.countInStock,
            offre:data.offre,
            qty
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const removeFomCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTyps.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
};

export const resetCart =()=>(dispatch, getState)=>{
    dispatch({
        type:actionTyps.CART_RESET,
        payload:[]
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
};