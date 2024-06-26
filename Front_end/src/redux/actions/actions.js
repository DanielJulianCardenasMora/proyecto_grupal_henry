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
  ALERTS_ACTIVE,
  REGISTER,
} from "./type";

//! URL -------------------

//const URL = "http://localhost:3001";
 const URL = "https://proyectogrupalhenry-production-e8a4.up.railway.app"

//! ------------------------

export const getAllProducts = (page, filters) => {
  const pageNumbers = page || 1;
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/products?page=${pageNumbers}`, {
        params: filters,
      });

      dispatch({
        type: GET_PRODUCTS,
        payload: [response.data.products, response.data.totalPage],
      });
    } catch (error) {
      ;
    }
  };
};

export const getOrders = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/admin/orders`);

      dispatch({ type: ORDERS, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getOrderDetail = (orderId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/orders/${orderId}`);

      dispatch({ type: ORDER_DETAIL, payload: response.data });
    } catch (error) {
      alert(error.message.response.data);
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/admin/users-list`);

      dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export function getProductDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/products/${id}`);

      return dispatch({
        type: DETAIL,
        payload: data,
      });
    } catch (error) {
      ;
    }
  };
}

export function searchByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/products?name=${name}`);

      return dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      ;
    }
  };
}

export const enviarCarritoAlBackend = (order) => {
  ;
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/orders/create`, order);
      ;
      alert("Orden de compra enviada");

      dispatch({ type: ENVIAR_CARRITO_AL_BACKEND, payload: response });
    } catch (error) {
      ;
    }
  };
};

export const payment = (price) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/create-order`, {
        totalPrice: price,
      });
      ;
      dispatch({ type: PAYMENT, payload: response.data.links[1].href });
    } catch (error) {
      ;
    }
  };
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(`${URL}/admin/create`, formData, config);
    
    dispatch({
      type: ADD_PRODUCT,
      payload: response.data,
    });
  } catch (error) {
    const response = error.response.data.errors
    dispatch({
      type: PRODUCT_ERROR,
      payload: response
    });
  }
};

export const updateGenderFilter = (gender) => ({
  type: UPDATE_GENDER_FILTER,
  payload: gender,
});

export const updateCategoryFilter = (category) => {
  ;
  return {
    type: UPDATE_CATEGORY_FILTER,
    payload: category,
  };
};

export const updatePriceFilter = (sortOrder) => {
  ;
  return {
    type: UPDATE_PRICE_FILTER,
    payload: sortOrder,
  };
};

export const alertsActive = (payload) => {
  return {
    type: ALERTS_ACTIVE,
    payload: payload,
  };
};

export const register = (payload) => {
  return {
    type: REGISTER,
    payload: payload,
  };
};

export const resetErrors = () => {

  return {
    type: PRODUCT_ERROR,
    payload: []
  }
}
