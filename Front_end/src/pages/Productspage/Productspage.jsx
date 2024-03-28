import React,{useEffect} from "react";
import { Products } from "../../Components/Products/Products";
import { Menu } from "../../Components/Menu/Menu";
import { Cards } from "../../Components/Cards/Cards";
import { useDispatch } from "react-redux";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { render } from "../../redux/actions/actions";


export const ProductsPage = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(render())
  },[])
  return (
    <div style={
      {
        position: 'relative',
        height: '100vh'
      }
    } >
      <Cards />
      <Products />
      <Cards />
      <SearchBar />
      <Menu />
    </div>
  )
}