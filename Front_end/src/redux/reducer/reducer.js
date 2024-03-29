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
  TotalPages: 0,
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

    case PRICE_FILTER:
      const sorted = state.ProductsScreen.slice(); // Crea una copia del estado
      if (payload === "asc") {
        sorted.sort((a, b) => {
          const priceA = a.price;
          const priceB = b.price;
          return priceB - priceA;
        });
      }
      if (payload === "des") {
        sorted.sort((a, b) => {
          const priceA = a.price;
          const priceB = b.price;
          return priceA - priceB;
        });
      }
      return {
        ...state,
        ProductsScreen: sorted,
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
