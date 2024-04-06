import {
  GET_PRODUCTS,
  SEARCH_BY_NAME,
  GENDER_FILTER,
  DETAIL,
  CATEGORY_FILTER,
  ADD_PRODUCT,
  ENVIAR_CARRITO_AL_BACKEND,
  ORDERS,
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
  images: "",
  imageUrl: '',
  orders: [],
  totalPage: 1,
  filters: {
    gender: '', // Filtro de género
    category: '', // Filtro de categoría
    sortOrder: '' // Orden de precio
  }
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
      return {
        ...state,
        orders: [...payload]
      }
    case GET_PRODUCTS:
      return {
        ...state,
        Products: [...payload[0]],
        ProductsScreen: [...payload[0]],
        TotalPages: payload[1],
      };
<<<<<<< HEAD

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
=======
>>>>>>> c6cbaac00876d9cb9ba59c5c8a9a6ccdad40f3a0
    case DETAIL:
      return {
        ...state,
        Detail: payload,
      };
    case ADD_PRODUCT:
      console.log('Paylod de add reducer', payload);
      return {
        ...state,
        Products: [payload, ...state.Products],
        loading: false
      };
    case 'UPDATE_GENDER_FILTER':
      console.log('reducer', payload);
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
    default:
      return { ...state };
  }
}
