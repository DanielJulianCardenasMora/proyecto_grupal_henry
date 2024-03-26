import {
  GET_PRODUCTS,
  SEARCH_BY_NAME,
  PRICE_FILTER,
  GENDER_FILTER,
  DETAIL,
  CATEGORY_FILTER,
  NAVEGACION,
} from "../actions/type";

const initialstate = {
  Products: [],
  ProductsScreen: [],
  Detail: [],
  Index: 2,
};

export default function rootReducer(state = initialstate, { type, payload }) {
  switch (type) {
    case SEARCH_BY_NAME:
      console.log(payload);

      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      };

    case GET_PRODUCTS:
      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      };
    
    case NAVEGACION:
      if (payload === 'as') {
        return {
          ...state,
          Index: state.Index + 1,
        };
      }else if(payload === 'de') {
        return {
          ...state,
          Index: state.Index - 1,
        };
      }
      
    case PRICE_FILTER:
      console.log(payload)
      return {
        ...state,
        ProductsScreen: [...payload],
      };

    case GENDER_FILTER:
      const opcion = payload;
      const products = state.Products;
      const productoPorGenero = products.filter((producto) => {
        return producto.genero === opcion;
      });
      return {
        ...state,
        Products: [...state.Products],
        ProductsScreen: productoPorGenero,
      };
    case DETAIL:
      console.log(payload);
      return {
        ...state,
        Detail: payload,
      };
    case CATEGORY_FILTER:
      let combinedResults = [];
      payload.forEach((f) => {
        const filterProductsxCateg = state.Products.filter(
          (products) => products.category === f
        );
        combinedResults = [...combinedResults, ...filterProductsxCateg];
      });

      return {
        ...state,
        ProductsScreen: combinedResults.length
          ? combinedResults
          : state.Products,
      };
    default:
      return { ...state };
  }
}
