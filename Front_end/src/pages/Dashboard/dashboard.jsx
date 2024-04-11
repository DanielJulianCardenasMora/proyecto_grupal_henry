import style from './css/Dashboard.module.css'
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/sidebar"

export default function  Dashboard() {

    return (
       <div className={style.admin}>
         <Sidebar />
           <Outlet/>
       </div>

    )
}