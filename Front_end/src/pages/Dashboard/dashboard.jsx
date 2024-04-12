import style from './css/Dashboard.module.css'
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/sidebar"
import Nav from '../../Components/Nav/Nav'

export default function  Dashboard() {

    return (
      <>
      <Nav/>
             <div className={style.admin}>

<Sidebar />
  <Outlet/>
</div>
      </>


    )
}