import React, { useEffect } from "react";
import axios from "axios";


export const OrderDetail = (id) => {

    const Detail = async () => {
        try {
            const detalle = await axios.get(`https://proyectogrupalhenry-production-e8a4.up.railway.app/orders/${id}`)
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        Detail()
    }, [id])


    return (
        <div>
            <br></br>
            <h1>Order Detail</h1>

            <p>Order ID: </p>
            <p>Quantity: </p>
            <p>Size: </p>
            <p>Name: </p>
            <p>Price: </p>
            <p>Product ID: </p>
            <p>Order ID: </p>

        </div>
    )
}