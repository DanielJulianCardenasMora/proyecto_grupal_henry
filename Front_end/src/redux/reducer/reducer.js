import {
    GET_PRODUCTS,
    SEARCH_BY_NAME,
    PRICE_FILTER,
 
  } from "../actions/type";
  
  const initialstate = {
    Products:[],
    ProductsScreen:[],
    Detail:[]
  };

export default function rootReducer(state = initialstate, { type, payload }){
    switch (type) {
        case SEARCH_BY_NAME:
       
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
            console.log("asc")
            console.log(sorted)
            
            sorted.sort((a, b) => {
            })
          }

          if(payload === 'des'){
            console.log("des")
            console.log(sorted)

            sorted.sort((a, b) => {

            })
          }
  
        default:
          return { ...state };
      }

}