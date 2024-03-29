import React from "react";
import { Detail } from "../../Components";



export const DetailPage = (props) => {

    const {carrito, agregarProducto}= props
    return (
        <div>
            <Detail carrito={carrito} agregarProducto={agregarProducto}  />
        </div>
    )
}