import {
  GET_PRODUCTS,
  SEARCH_BY_NAME,
  GENDER_FILTER,
  DETAIL,
  CATEGORY_FILTER,
  ADD_PRODUCT,
  ENVIAR_CARRITO_AL_BACKEND,
  ORDERS
  PRICE_FILTER
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
  images: [], 
  orders:[]
  totalPage: 1
};

export default function rootReducer(state = initialstate, { type, payload }) {
  switch (type) {
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

    return{
      ...state,
      orders:[...payload]
    }

    case GET_PRODUCTS:
      return {
        ...state,
        Products: [...payload[0]],
        ProductsScreen: [...payload[0]],
        TotalPages: payload[1],
      };
    case GENDER_FILTER:
      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      }
    case DETAIL:
      return {
        ...state,
        Detail: payload,
      };
    case CATEGORY_FILTER:
      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      };
    case ADD_PRODUCT:
      return {
        ...state,
        Products: [payload, ...state.Products], 
        loading: false
      };
    case PRICE_FILTER:
      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      }
    default:
      return { ...state };
  }
}
