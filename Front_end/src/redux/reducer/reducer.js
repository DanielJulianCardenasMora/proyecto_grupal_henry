import axios from "axios";

import {
  RENDER,
  SEARCH_BY_NAME,
  PRICE_FILTER,
  GENDER_FILTER,
  DETAIL,
  CATEGORY_FILTER,
  NAVEGACION,
  ALL_PRODUCTS
} from "../actions/type";

const initialstate = {
  Products: [],
  ProductsScreen: [],
  Detail: [],
  Index: 2,
  TotalPages: 0,
  Api: "http://localhost:3001/products",
  Filtrado: ""
};

export default function rootReducer(state = initialstate, { type, payload }) {
  switch (type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        Products: [...payload],
        ProductsScreen: [...payload],
      };

    case ALL_PRODUCTS:
      return {
        ...state,
        Products: [...payload.products],
        ProductsScreen: [...payload.products],
        TotalPages: payload.TotalPage
      };

    case RENDER:
      return {
        ...state,
        ProductsScreen: payload
      };

    case PRICE_FILTER:
      return {
        ...state,
        Filtrado: payload
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
