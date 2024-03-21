import {
    GET_PRODUCTS,
    SEARCH_BY_NAME,
    GENDER_FILTER,
  } from "../actions/type";
  
  const initialstate = {
    Products:[],
    ProductsScreen:[],
    Detail:[]
  };

export default function rootReducer(state = initialstate, { type, payload }){
    switch (type) {

        case SEARCH_BY_NAME:
            console.log(payload);
       
          return {
            ...state,
            Products: [...payload],
          };

      
        case GET_PRODUCTS:
          return {
            ...state,
            Products: [...payload],
            ProductsScreen:[...payload]
        };
      
      
        case GENDER_FILTER:
          const opcion = payload
          const products = state.Products
          const productoPorGenero = products.filter((producto) => {
            return producto.genero === opcion;
          });
          return {
            ...state,
            Products: [...state.Products],
            ProductsScreen: productoPorGenero,
          }
  
      
        default:
          return { ...state };
      }

}