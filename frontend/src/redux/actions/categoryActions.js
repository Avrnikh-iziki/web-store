import * as actiosnTypes from '../constants/categoryConstants'
import axios from 'axios'

export const getCategory =() => async (dispatch) =>{
    try{
        dispatch({type: actiosnTypes.GET_CATEGORY_REQUEST});
        const { data } = await axios.get('/api/category')
        dispatch({
            type:actiosnTypes.GET_CATEGORY_SUCCESS,
            payload: data
        })
    } catch(err){
        dispatch({
            type : actiosnTypes.GET_CATEGORY_FAIL ,
            payload: err.response && err.response.data.message ? Array.response.data.message : err.message
            
        })
    }
};

