import * as actionTypes from '../constants/categoryConstants'
export const getCategoryReducer = (state ={ category : [] }, action) =>{
  switch(action.type){
    case actionTypes.GET_CATEGORY_REQUEST:
        return{
            loading1: true,
            category : [],
        }
    case actionTypes.GET_CATEGORY_SUCCESS:
        return {
            loading1: false,
            category: action.payload,
        }
    case actionTypes.GET_CATEGORY_FAIL:
        return {
            loading : false,
            error1 : action.payload,
        }
    default:
        return state;        
  }  
};

 