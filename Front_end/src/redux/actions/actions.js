import axios from "axios";
import {
    GET_PRODUCTS, 
    GET_USERS,
    CATEGORY,
    ORDERS,
    DETAIL ,
    SEARCH_BY_NAME,
    CATEGORY_FILTER,
    PRICE_FILTER ,
    GENDER_FILTER ,
    POST_ITEM ,

} from "./type";
const URL = 'https://wearfashion-947fb-default-rtdb.firebaseio.com/products/products.json'

export const getAllProducts = () => {

    return async function (dispatch) {
      try {
        const response = await axios.get(URL);
       
        dispatch({ type: GET_PRODUCTS, payload: response.data });
   
      } catch (error) {
        alert(error.message);
      }
    }}


export const getOrders = () => {

        return async function (dispatch) {
          try {
            const response = await axios.get("");
           
            dispatch({ type: ORDERS, payload: response.data });
          } catch (error) {
            alert(error.message);
          }
        }}

export const getUsers = () => {

            return async function (dispatch) {
              try {
                const response = await axios.get("");
               
                dispatch({ type: GET_USERS, payload: response.data });
              } catch (error) {
                alert(error.message);
              }
}}


export function getProductDetail(id) {

      return async function (dispatch) {
  
          try {
              const {data} = await axios.get('http://localhost:3001/products/' + id)
              
              return dispatch({
                  type: DETAIL,
                  payload: data
              })
          }
          catch(error) {
              console.log(error)
          }
          
      }
  }


export function searchByName(name){
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/products?name=${name}`)
          
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data
            })
        } catch (error){
          return error
        }
    }
}

export function getCategories(){
  return async function(dispatch){
    try {
      const response = await axios.get(URL)
   
      return dispatch({
        type: CATEGORY,
        payload:response.data
      })
    } catch (error) {
      alert.log(error);
    }
  }
}

export function postItem(i){

  return async function(){

      const response = await axios.post('', i)

      alert("Item created")


      return response
  }

}

export const priceFilter = (order) => {
  try {
    return {
      type: PRICE_FILTER,
      payload: order,
    };
  } catch (error) {
    alert(error.message);
  }
};



export const categoriesFilter = (event) => {
  try {
    return {
      type: CATEGORY_FILTER,
      payload: event,
    };
  } catch (error) {
    alert(error.message);
  }
};


export const genderFilter = (gender) => {
  try {
      return {
        type: GENDER_FILTER,
        payload: gender,
      };
      
  } catch (error) {
    alert(error.message);
  }
}
