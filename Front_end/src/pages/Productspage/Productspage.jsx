import React from "react";
import { Products } from "../../Components/Products/Products";
import { Menu } from "../../Components/Menu/Menu";



export const ProductsPage = () => {
  return (
    <div style={
      {
        position: 'relative',
        overflow: 'hidden',
        height: '100vh'
      }
    } >
      <Products />
      <Menu />
    </div>
  )
}