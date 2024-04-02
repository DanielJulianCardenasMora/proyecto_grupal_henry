import {
  GET_PRODUCTS,
  SEARCH_BY_NAME,
  PRICE_FILTER_ASC,
  PRICE_FILTER_DES,
  GENDER_FILTER,
  DETAIL,
  CATEGORY_FILTER,
} from "../actions/type";

const initialstate = {
  Products: [],
  ProductsScreen: [],
  Detail: [],
  Index: 2,
  TotalPages: 0,
  UrlActual: "http://localhost:3001/products",
  FiltroActivo: [],
  FiltroNuevo: (false)
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
      
      console.log('filtroaes')
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
      console.log('filtrodes')
      return {
        ...state,
        FiltroActivo: priceDes,
        UrlActual: urlDes,
        Products: [...payload[0]],
        ProductsScreen: [...payload[0]],
        TotalPages: payload[1],
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
