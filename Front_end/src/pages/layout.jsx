import { Outlet } from "react-router-dom";
import { Nav } from '../Components';
export default function  Layout() {

    return (
       <>   
            <Nav/>
           <Outlet/>
       </>

    )
}