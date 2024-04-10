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
  PRICE_FILTER,
  UPDATE_PRICE_FILTER,
  UPDATE_CATEGORY_FILTER,
  UPDATE_GENDER_FILTER,
  ORDER_DETAIL,
  PAYMENT
} from "./type";

 const URL = 'https://proyectogrupalhenry-production-e8a4.up.railway.app'
 //const URL = 'http://localhost:3001';

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
      const response = await axios.get(`${URL}/orders`);

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

// export const getUsers = () => {

//   return async function (dispatch) {
//     try {
//       const response = await axios.get("https://proyectogrupalhenry-production-e8a4.up.railway.app/users/lurm98@gmail.com");

//       dispatch({ type: GET_USERS, payload: response.data });
//     } catch (error) {
//       alert(error.message);
//     }
//   }
// }


export function getProductDetail(id) {
  console.log('id: ' + id)
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
      console.log(price)
      const response = await axios.post(`${URL}/create-order`, {totalPrice: price})
      console.log(response.data)
      dispatch({type: PAYMENT, payload: response.data.links[1].href})
    } catch (error) {
      console.log("error payment: " + error)
    }
  }
}
export function postItem(i) {

  return async function () {

    const response = await axios.post('', i)

    alert("Item created")


    return response
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

export const genderFilter = (gender) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/products?gender=${gender}`);
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

export const priceFilter = (sortOrder, page) => {
  return async function (dispatch) {
    try {
      const sortBy = 'price';
      const response = await axios.get(`${URL}/products?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`);
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
export const filterByCategory = (category) => {

  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/products?category=${category}`);
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

export const updateGenderFilter = (gender) => ({
  type: 'UPDATE_GENDER_FILTER',
  payload: gender,
});

export const updateCategoryFilter = (category) => {
  console.log("Sorting category:", category);
  return {
    type: 'UPDATE_CATEGORY_FILTER',
    payload: category,
  }

};

export const updatePriceFilter = (sortOrder) => {
  console.log("Sorting order:", sortOrder);
  return {
    type: 'UPDATE_PRICE_FILTER',
    payload: sortOrder,
  };
};