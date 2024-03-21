import {
    GET_PRODUCTS,
    SEARCH_BY_NAME,
    PRICE_FILTER
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
            // console.log(payload);
       
          return {
            ...state,
            Products: [...payload],
            ProductsScreen:[...payload]
          };

          case PRICE_FILTER:
          const sorted = state.ProductsScreen.slice(); // Crea una copia del estado
          if(payload === 'asc'){
            sorted.sort((a, b) => {  
              const priceA = a.price
              const priceB = b.price            
                return priceB - priceA
            })
          }
          if(payload === 'des'){
            sorted.sort((a, b) => {  
              const priceA = a.price
              const priceB = b.price            
                return priceA - priceB
            })
          }
          return {
            ...state,
            ProductsScreen: sorted,
          }
  
        default:
          return { ...state };
      }

}