import {
  GET_PRODUCTS,
  SEARCH_BY_NAME,
  GENDER_FILTER,
  DETAIL,
  CATEGORY_FILTER,
  ADD_PRODUCT,
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
  totalPage: 1
};

export default function rootReducer(state = initialstate, { type, payload }) {
  switch (type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        Products: [...payload[0]],
        ProductsScreen: [...payload[0]],
        TotalPages: payload[1],
      };

    case PRICE_FILTER_ASC:
      const priceAsc = ['priceAsc'];
      const urlAsc = state.UrlActual + "?sortBy=price&sortOrder=asc";
      
      return {
        ...state,
        FiltroActivo: priceAsc,
        UrlActual: urlAsc,
        Products: [...payload[0]],
        ProductsScreen: [...payload[0]],
        TotalPages: payload[1],
      };

    case PRICE_FILTER_DES:
      const priceDes = ['priceDes'];
      const urlDes = state.UrlActual + "?sortBy=price&sortOrder=desc"

      return {
        ...state,
        FiltroActivo: priceDes,
        UrlActual: urlDes,
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
