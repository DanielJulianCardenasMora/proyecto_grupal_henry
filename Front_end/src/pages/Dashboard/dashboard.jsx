import Sidebar from "../../Components/Dashboard/sidebar"
import { Outlet } from "react-router-dom";

export default function  Dashboard() {

    return (
       <div>
           <Sidebar />
           <Outlet/>
       </div>

    )
}