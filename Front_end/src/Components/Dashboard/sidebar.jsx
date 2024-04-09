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
                <button className={styles.navButton} onClick={() => toggleMostrarSeccion("products")}>Products</button>
                {mostrarSecciones.has("products") && (
                    <div className={styles.subMenu}>
                        <ButtonLink className={styles.links} linkTo={"products"} text={"All products"} />
                        <ButtonLink className={styles.links} linkTo={"products/create"} text={"Create"} />
                        <ButtonLink className={styles.links} linkTo={"products/follow-up"} text={"Shipping Management and Tracking"} />
                    </div>
                )}

                <button className={styles.navButton} onClick={() => toggleMostrarSeccion("clients")}>Clients</button>
                {mostrarSecciones.has("clients") && (
                    <div className={styles.subMenu}>
                        <ButtonLink linkTo={"clients"} text={"All clients"} />
                        <ButtonLink linkTo={"clients/Special-management"} text={"Special Management"} />
                        <ButtonLink linkTo={"clients/Returns-refunds"} text={"Returns and Refunds"} />
                    </div>
                )}

                <button className={styles.navButton} onClick={() => toggleMostrarSeccion("promotions")}>Promotions</button>
                {mostrarSecciones.has("promotions") && (
                    <div className={styles.subMenu}>
                        <ButtonLink linkTo={"promotions/discounts"} text={"Discounts"} />
                        <ButtonLink linkTo={"promotions/products-ranking"} text={"Ranking Products"} />
                        <ButtonLink linkTo={"promotions/clients-ranking"} text={"Ranking Clients"} />
                    </div>
                )}

                <button className={styles.navButton} onClick={() => toggleMostrarSeccion("statistics")}>Statistics</button>
                {mostrarSecciones.has("statistics") && (
                    <div className={styles.subMenu}>
                        <ButtonLink linkTo={"statistics/sales"} text={"Sales"} />
                        <ButtonLink linkTo={"statistics/products-ranking"} text={"Ranking Products"} />
                        <ButtonLink linkTo={"statistics/clients-ranking"} text={"Ranking Clients"} />
                    </div>
                )}
                {/* <Link to="/">
                    <button className={styles.buttonlogout}>Log out</button>
                </Link> */}
            </nav>
        </div>
    );
}


