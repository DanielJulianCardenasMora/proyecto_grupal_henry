import React, { useEffect } from "react";
import axios from "axios";


export const OrderDetail = (id) => {

    const Detail = async () => {
        try {
            const detalle = await axios.get(`https://proyectogrupalhenry-production-e8a4.up.railway.app/orders/${id}`)
            console.log(detalle)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        Detail()
    }, [id])


    return (
        <div>
            <h1>Order Detail</h1>



        </div>
    )
}