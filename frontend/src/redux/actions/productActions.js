import * as actiosnTypes from '../constants/productConstant'
import axios from 'axios'

export const getProducts = (id) => async (dispatch) => {
    try {

        dispatch({ type: actiosnTypes.GET_PRODUCTS_REQUEST });
        const { data } = await axios.get('/api/prodcuts')

        if (id) {
             await axios.delete("/api/addproducts/" + id)
            dispatch({
                type: actiosnTypes.REMOVE_PRODUCTS_SUCCESS,
                payload: data,
                id:id
            })

        } else {
            dispatch({
                type: actiosnTypes.GET_PRODUCTS_SUCCESS,
                payload: data
            })
        }

    } catch (err) {
        dispatch({
            type: actiosnTypes.GET_PRODUCTS_FAIL,
            payload: err.response && err.response.data.message ? Array.response.data.message : err.message
        })
    }
};

export const getProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actiosnTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/prodcuts/${id}`)
        dispatch({
            type: actiosnTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actiosnTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actiosnTypes.GET_PRODUCT_DETAILS_RESET
    });
};

