import axios from "axios";
import {
  GET_PRODUCTS,
  GET_USERS,
  ORDERS,
  DETAIL,
  SEARCH_BY_NAME,
  CATEGORY_FILTER,
  GENDER_FILTER,
  NAVEGACION,
  PRODUCT_ERROR,
  ADD_PRODUCT,
  ENVIAR_CARRITO_AL_BACKEND,
  PRICE_FILTER
} from "./type";

const URL = 'http://localhost:3001/products'

export const getAllProducts = (page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}?page=${page}`);
      console.log(response.data)
      console.log(response.data.totalPage)
      dispatch({
        type: GET_PRODUCTS,
        payload: [response.data.products, response.data.totalPage],
      });
    } catch (error) {
      alert(error.message);
    }
  }
}

export const priceFilter = (sortOrder, page) => {
  return async function (dispatch) {
    try {
      const sortBy = 'price';
      const response = await axios.get(`${URL}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
      console.log('De actions', response.data.products);
      dispatch({
        type: PRICE_FILTER,
        payload:
          response.data.products,

      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const getOrders = () => {

  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/orders");

      dispatch({ type: ORDERS, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  }
}

export const getUsers = () => {

  return async function (dispatch) {
    try {
      const response = await axios.get("");

      dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  }
}


export function getProductDetail(id) {

  return async function (dispatch) {

    try {
      const { data } = await axios.get(`${URL}/${id}`)

      return dispatch({
        type: DETAIL,
        payload: data
      })
    }
    catch (error) {
      console.log(error)
    }

  }
}


export function searchByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/products?name=${name}`)

      return dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data
      })
    } catch (error) {
       console.log(error)
    }
  }
}

export const filterByCategory = (category) => {

  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}?category=${category}`);
      console.log('actions', response.data.products);
      dispatch({
        type: CATEGORY_FILTER,
        payload: response.data.products,
      });
    } catch (error) {
      alert(error.message);
    }
  }
}
export const enviarCarritoAlBackend = (order) => {
  
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/orders/create', order);
      console.log('Orden creada:', response.data);
      alert('Orden de compra enviada')

      dispatch({type: ENVIAR_CARRITO_AL_BACKEND, payload: response})
 
    } catch (error) {
  

    }
  };
};
export function postItem(i) {

  return async function () {

    const response = await axios.post('', i)

    alert("Item created")


    return response
  }

}


export const genderFilter = (gender) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}?gender=${gender}`);
      console.log('actions', response.data.products);
      dispatch({
        type: GENDER_FILTER,
        payload: response.data.products,
      });
    } catch (error) {
      alert(error.message);
    }
  }
}

export const addProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await axios.post(`${URL}/create`, formData, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
