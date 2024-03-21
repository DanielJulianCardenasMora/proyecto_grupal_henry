import React,{useEffect} from "react";
import { Products } from "../../Components/Products/Products";
import { Menu } from "../../Components/Menu/Menu";
import { Cards } from "../../Components/Cards/Cards";
import { useDispatch,useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/actions";
import SearchBar from "../../Components/SearchBar/SearchBar";


export const ProductsPage = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch( getAllProducts())
  },[])
  return (
    <div style={
      {
        position: 'relative',
        height: '100vh'
      }
    } >
      <SearchBar />
      <Cards />
      <Products />
      <Cards />
      <Menu />
    </div>
  )
}