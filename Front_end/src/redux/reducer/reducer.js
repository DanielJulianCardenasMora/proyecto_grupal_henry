import {
    GET_PRODUCTS,
    SEARCH_BY_NAME,
    
 
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
  
        default:
          return { ...state };
      }

}