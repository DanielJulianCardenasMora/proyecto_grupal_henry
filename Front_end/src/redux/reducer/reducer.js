import { FaPause } from "react-icons/fa";
import {
  GET_PRODUCTS,
  SEARCH_BY_NAME,
  DETAIL,
  ADD_PRODUCT,
  ENVIAR_CARRITO_AL_BACKEND,
  ORDERS,
  ORDER_DETAIL,
  PRICE_FILTER,
  PAYMENT,
  GET_USERS,
  ALERTS_ACTIVE,
  REGISTER,
  PRODUCT_ERROR
} from "../actions/type";

const initialstate = {
  Products: [],
  ProductsScreen: [],
  Detail: [],
  Index: 2,
  TotalPages: 0,
  name: '',
  description: '',
  price: '',
  stock: '',
  genero: '',
  category: '',
  images: "",
  imageUrl: '',
  size: [],
  orders: [],
  orderDetail: [],
  users: [],
  totalPage: 1,
  filters: {
    gender: '', // Filtro de género
    category: '', // Filtro de categoría
    sortOrder: '' // Orden de precio
  },
  alerts: false,
  register: false,
  productError: []
};

export default function rootReducer(state = initialstate, { type, payload }) {
  switch (type) {

  case GET_USERS:
  return{
    ...state,
    users:[...payload]

  }

    case SEARCH_BY_NAME:

      return {
        ...state,
        Products: [...payload.products],
        ProductsScreen: [...payload.products],
      };

    case ENVIAR_CARRITO_AL_BACKEND:
      console.log(payload);
      return {
        ...state,
        orders: [...payload],

      };

    case ORDERS:
      return {
        ...state,
        orders: [...payload]
      }

    case ORDER_DETAIL:
      console.log(payload);
      return {
        ...state,
        orderDetail: [...payload]
      }
    case GET_PRODUCTS:
      return {
        ...state,
        Products: [...payload[0]],
        ProductsScreen: [...payload[0]],
        TotalPages: payload[1],
      };
    case DETAIL:
      return {
        ...state,
        Detail: payload,
      };
    case ADD_PRODUCT:
      console.log('Payload de add reducer', payload);
      return {
        ...state,
        Products: [payload, ...state.Products], // Agrega el nuevo producto al principio del array
        ProductsScreen: [payload, ...state.ProductsScreen], // También actualiza la pantalla de productos si es necesario
        loading: false
      };
    case 'UPDATE_GENDER_FILTER':
      console.log('gender reduce:', payload);
      return {
        ...state,
        filters: {
          ...state.filters,
          gender: payload,
        },
      };
    case 'UPDATE_CATEGORY_FILTER':
      console.log('category', state.filters);
      return {
        ...state,
        filters: {
          ...state.filters,
          category: payload,
        },
      };
    case 'UPDATE_PRICE_FILTER':
      console.log("Sorting order received in reducer:", payload);
      return {
        ...state,
        filters: {
          ...state.filters,
          sortOrder: payload,
        },
      };

    case 'PAYMENT':
      window.location.href = payload


    case "ALERTS_ACTIVE": 
    
    return {
      ...state,
      alerts: payload
    }

    case "REGISTER":

    return {
      ...state,
      register: payload
    }

    case PRODUCT_ERROR:

      return{
        ...state,
        productError: payload
      }
    default:
      return { ...state };
  }
}
