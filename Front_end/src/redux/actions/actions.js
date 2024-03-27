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
  POST_ITEM,
  NAVEGACION,

} from "./type";

const URL = 'http://localhost:3001/products'
//URL = http://localhost:3001/products
//sortBy=price&sortOrder=desc --> precio filtro

export const getAllProducts = (page) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL}?page=${page}`);

        dispatch({
          type: GET_PRODUCTS,
          payload: [response.data.products, response.data.totalPage],
        });
      } catch (error) {
        alert(error.message);
      }
  }}


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

export const priceFilter = (ruta) => {
  //http://localhost:3001/products?sortBy=price&sortOrder=asc
  console.log(ruta)
  return async function(dispatch){
    try {
      const response = await axios.get(`${URL}${ruta}`)

        return dispatch({
          type: PRICE_FILTER,
          payload: [response.data.products, response.data.totalPage],
        })
    } catch (error) {
      console.log(error)
    }
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
