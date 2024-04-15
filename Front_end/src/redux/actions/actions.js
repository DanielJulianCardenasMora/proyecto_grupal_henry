import axios from "axios";
import {
  GET_PRODUCTS,
  GET_USERS,
  ORDERS,
  DETAIL,
  SEARCH_BY_NAME,
  PRODUCT_ERROR,
  ADD_PRODUCT,
  ENVIAR_CARRITO_AL_BACKEND,
  UPDATE_PRICE_FILTER,
  UPDATE_CATEGORY_FILTER,
  UPDATE_GENDER_FILTER,
  ORDER_DETAIL,
  PAYMENT,
  ALERTS_ACTIVE
} from "./type";

  //! URL -------------------

  // const URL = "http://localhost:3001"
  const URL = "https://proyectogrupalhenry-production-e8a4.up.railway.app"

  //! ------------------------

  
export const getAllProducts = (page, filters) => {
  const pageNumbers = page || 1;
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/products?page=${pageNumbers}`, { params: filters });

      dispatch({
        type: GET_PRODUCTS,
        payload: [response.data.products, response.data.totalPage],
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const getOrders = () => {

  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/admin/orders`);

      dispatch({ type: ORDERS, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  }
}



export const getOrderDetail = (orderId) => {

  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/orders/${orderId}`);

      dispatch({ type: ORDER_DETAIL, payload: response.data });
    } catch (error) {
      alert(error.message.response.data);
    }
  }
}

export const getUsers = () => {

  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/admin/users-list`);

      dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      console.error(error.message);
    }
  }
}


export function getProductDetail(id) {
  return async function (dispatch) {

    try {
      const { data } = await axios.get(`${URL}/products/${id}`)

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
      const response = await axios.get(`${URL}/products?name=${name}`)

      return dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const enviarCarritoAlBackend = (order) => {
console.log(order);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/orders/create`, order);
      console.log('Orden creada:', response.data);
      alert('Orden de compra enviada')

      dispatch({ type: ENVIAR_CARRITO_AL_BACKEND, payload: response })

    } catch (error) {

      console.log('este es el error:', error)
    }
  };
};

export const payment = (price) => {

  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/create-order`, {totalPrice: price})
      console.log(response.data)
      dispatch({type: PAYMENT, payload: response.data.links[1].href})
    } catch (error) {
      console.log("error payment: " + error)
    }
  }
}

export const addProduct = (formData) => async (dispatch) => {
  console.log('FormData de actions:', formData);
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await axios.post(`${URL}/admin/create`, formData, config);
    console.log('respuesta de action', response.data);
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



export const updateGenderFilter = (gender) => ({
  type: UPDATE_GENDER_FILTER,
  payload: gender,
});

export const updateCategoryFilter = (category) => {
  console.log("Sorting category:", category);
  return {
    type: UPDATE_CATEGORY_FILTER,
    payload: category,
  }

};

export const updatePriceFilter = (sortOrder) => {
  console.log("Sorting order:", sortOrder);
  return {
    type: UPDATE_PRICE_FILTER,
    payload: sortOrder,
  };
};


export const alertsActive = (payload) => {

  return {
    type: ALERTS_ACTIVE,
    payload: payload
  }
}