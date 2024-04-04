import axios from "axios";
import {
  GET_PRODUCTS,
  GET_USERS,
  CATEGORY,
  ORDERS,
  DETAIL,
  SEARCH_BY_NAME,
  CATEGORY_FILTER,
  PRICE_FILTER_ASC,
  PRICE_FILTER_DES,
  GENDER_FILTER,
  NAVEGACION,
  PRODUCT_ERROR,
  ADD_PRODUCT,
  ENVIAR_CARRITO_AL_BACKEND
} from "./type";

const URL = 'http://localhost:3001/products'


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
  }
}



export const priceFilterAsc = (currentPage) => {
  console.log(currentPage)
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}?sortBy=price&sortOrder=asc&page=${currentPage}`)
      return dispatch({
        type: PRICE_FILTER_ASC,
        payload: [response.data.products, response.data.totalPage],
      })
    } catch (error) {
      console.log(error)
    }
  }
};


export const priceFilterDes = (currentPage) => {
  console.log(currentPage)
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}?sortBy=price&sortOrder=desc&page=${currentPage}`)
      return dispatch({
        type: PRICE_FILTER_DES,
        payload: [response.data.products, response.data.totalPage],
      })
    } catch (error) {
      console.log(error)
    }
  }
};




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
console.log(response);
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data
      })
    } catch (error) {
       console.log(error)
    }
  }
}

export function getCategories() {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL)

      return dispatch({
        type: CATEGORY,
        payload: response.data
      })
    } catch (error) {
      alert.log(error);
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

export const addProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post(`${URL}/create`, formData, config);
    console.log('Actions adddi', response.data);
    console.log('form data de actions:', formData)
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
