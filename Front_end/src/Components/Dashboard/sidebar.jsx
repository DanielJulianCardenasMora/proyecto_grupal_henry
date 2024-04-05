import { useState } from "react";
import styles from "./sidebar.module.css";
import ButtonLink from "./buttonLink";
import { Link } from "react-router-dom";

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
            <nav>
                <button onClick={() => toggleMostrarSeccion("products")}>Products</button>
                {mostrarSecciones.has("products") && (
                    <div>
                        <ButtonLink linkTo={"products"} text={"Products"} />
                        <ButtonLink linkTo={"products/create"} text={"Create"} />
                        <ButtonLink linkTo={"products/follow-up"} text={"shipping management and tracking"} />
                    </div>
                )}

                <button onClick={() => toggleMostrarSeccion("clients")}>Clientss</button>
                {mostrarSecciones.has("clients") && (
                    <div>
                        <ButtonLink linkTo={"clients"} text={"Clients"} />
                        <ButtonLink linkTo={"clients/Special-management"} text={"Special management"} />
                        <ButtonLink linkTo={"clients/Returns-refunds"} text={"Returns and refunds"} />
                    </div>
                )}

                <button onClick={() => toggleMostrarSeccion("promotions")}>Promotions</button>
                {mostrarSecciones.has("promotions") && (
                    <div>
                        <ButtonLink linkTo={"promotions/discounts"} text={"discounts"} />
                        <ButtonLink linkTo={"promotions/products-ranking"} text={"Ranking product"} />
                        <ButtonLink linkTo={"promotions/clients-ranking"} text={"Ranking clientes"} />
                    </div>
                )}

                <button onClick={() => toggleMostrarSeccion("statistics")}>Estadisticas</button>
                {mostrarSecciones.has("statistics") && (
                    <div>
                        <ButtonLink linkTo={"statistics/sales"} text={"Ventas"} />
                        <ButtonLink linkTo={"statistics/products-ranking"} text={"Ranking product"} />
                        <ButtonLink linkTo={"statistics/clients-ranking"} text={"Ranking clientes"} />
                    </div>
                )}
                <Link to="/">
                <button className={styles.buttonlogout}>Log out</button>
                {/* El logout no muestra el icono  */}
                </Link>
            </nav>
        </div>
    );
}

