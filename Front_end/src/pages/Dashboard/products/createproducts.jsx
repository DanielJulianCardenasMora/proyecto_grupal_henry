
import { useState } from "react";
import style from '../css/ProductsCreate.module.css'
import Sidebar from "../../../Components/Dashboard/sidebar";
import {Create_form} from '../../../Components'


export default function CreateProducts() {

  return (
    <div>
      <Sidebar />
      <Create_form />
    </div>
    
  )
}

