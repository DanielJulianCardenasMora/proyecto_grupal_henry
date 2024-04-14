import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from './buttonLink';
import styles from './sidebar.module.css';

export default function Sidebar() {
    const [mostrarSecciones, setMostrarSecciones] = useState(new Set());

    const toggleMostrarSeccion = (seccion) => {
        const nuevasSecciones = new Set(mostrarSecciones);
        if (nuevasSecciones.has(seccion)) {
            nuevasSecciones.delete(seccion);
        } else {
            nuevasSecciones.add(seccion);
        }
        setMostrarSecciones(nuevasSecciones);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.sideBar}>
                <button className={styles.navButton1} onClick={() => toggleMostrarSeccion("products")}>Products</button>
                {mostrarSecciones.has("products") && (
                    <div className={styles.subMenu1}>

                        <ButtonLink className={styles.links} linkTo={"/dashboard/products"} text={"All products"} />
                        <ButtonLink className={styles.links} linkTo={"/dashboard/products/create"} text={"Create"} />
                        {/* <ButtonLink className={styles.links} linkTo={"products/follow-up"} text={"Shipping Management and Tracking"} /> */}
                    </div>
                )}

                <button className={styles.navButton2} onClick={() => toggleMostrarSeccion("clients")}>Customers</button>
                {mostrarSecciones.has("clients") && (
                    <div className={styles.subMenu2}>

                        <ButtonLink linkTo={"/dashboard/clients"} text={"All customers"} />
                        {/* <ButtonLink linkTo={"clients/Special-management"} text={"Special Management"} />
                        <ButtonLink linkTo={"clients/Returns-refunds"} text={"Returns and Refunds"} /> */}
                    </div>
                )}

                <button className={styles.navButton3} onClick={() => toggleMostrarSeccion("orders")}>Orders</button>
                {mostrarSecciones.has("orders") && (
                    <div className={styles.subMenu3}>
                        <ButtonLink linkTo={"/dashboard/ordersdash"} text={"All orders"} />
                        {/* <ButtonLink linkTo={"promotions/products-ranking"} text={"Ranking Products"} />
                        <ButtonLink linkTo={"promotions/clients-ranking"} text={"Ranking Clients"} /> */}
                    </div>
                )}

                <button className={styles.navButton4} onClick={() => toggleMostrarSeccion("statistics")}>Statistics</button>
                {mostrarSecciones.has("statistics") && (
                    <div className={styles.subMenu4}>

                        <ButtonLink linkTo={"/dashboard/statistics"} text={"Sales"} />
                        {/* <ButtonLink linkTo={"/dashboard/statistics/products-ranking"} text={"Ranking Products"} />
                        <ButtonLink linkTo={"/dashboard/statistics/clients-ranking"} text={"Ranking Clients"} /> */}
                    </div>
                )}
        
                <Link to={"/dashboard"}>
                <button className={styles.navButtonHome} >Dash Home</button>
                </Link>
            </nav>
        </div>
    );
}


