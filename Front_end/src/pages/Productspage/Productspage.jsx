import React from "react";
import { Products } from "../../Components/Products/Products";
import { Menu } from "../../Components/Menu/Menu";
import { Card } from "../../Components/Card/card";
import { Cards } from "../../Components/Cards/Cards";



export const ProductsPage = () => {
  return (
    <div style={
      {
        position: 'relative',
        height: '100vh'
      }
    } >
      <Products />
      <Cards />
      <Menu />
    </div>
  )
}