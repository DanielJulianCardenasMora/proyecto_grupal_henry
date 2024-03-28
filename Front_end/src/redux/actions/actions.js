import axios from "axios";
import {
    RENDER, 
    GET_USERS,
    CATEGORY,
    ORDERS,
    DETAIL ,
    SEARCH_BY_NAME,
    CATEGORY_FILTER,
    PRICE_FILTER ,
    GENDER_FILTER ,
  POST_ITEM,
  NAVEGACION,
  ALL_PRODUCTS,


} from "./type";

const URL = 'http://localhost:3001/products'
//URL = http://localhost:3001/products
//sortBy=price&sortOrder=desc --> precio filtro
export const getAll = (payload) => {
  return{
    type: ALL_PRODUCTS,
    payload: payload
  }
}

export const render = (products) => {
  return{
    type: RENDER,
    payload: products
  }
}

export const priceFilter = (url) => {
  console.log("action pricefilter: " + url)
  return async function(dispatch){
    try {

        return dispatch({
          type: PRICE_FILTER,
          payload: url
        })
    } catch (error) {
      console.log(error)
    }
  }
};


export const getIndex = (tipo) => {
  return async function (dispatch) {
    dispatch({ type: NAVEGACION, payload: tipo });
  }
}
        

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
              const {data} = await axios.get(`${URL}/${id}`)
              
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
