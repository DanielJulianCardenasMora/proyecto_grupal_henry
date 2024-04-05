import { useEffect, useState } from 'react';
import styles from './products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/actions';


export default function ProductsAdmin() {
    const Products = useSelector((state) => state.Products);
    const dispatch = useDispatch();
    const [editproduct, setEditproduct] = useState(null);
    console.log(Products);

    useEffect(() => {
        dispatch(getAllProducts()); 
    }, [dispatch]);

    ////Botones: por id (PARA MANTENER LOS MISMOS ESTILOS APLICADOS DE ICONOS DE LA DASH)
    //https://iconos8.es/icon/CACmiPMPF2dz/editar
    //https://iconos8.es/icon/ttcDePBb3hEc/basura
    //https://iconos8.es/icon/R5CrOgoga5vs/usuario
    const handleEdit = (productID) => {
        const productForEdit = Products.find(product => product.id === productID)
        setEditproduct(productForEdit);
    }
    
    const handleDelete = (productID) => {
        //Ver despúes
    }

    const handleSave = () => {
        setEditproduct(null);
    }

    const handleCancelEdit = () => {
        setEditproduct(null);
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditproduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <h1>All the products</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Genero</th>
                            <th>Category</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.length > 0 && Products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{editproduct && editproduct.id === product.id ? <input type="text" name="name" value={editproduct.name} onChange={handleInputChange} /> : product.name}</td>
                                <td>{editproduct && editproduct.id === product.id ? <input type="text" name="image" value={editproduct.image} onChange={handleInputChange} /> : <img src={product.image} alt={product.name} />}</td>
                                <td>{editproduct && editproduct.id === product.id ? <input type="number" name="stock" value={editproduct.stock} onChange={handleInputChange} /> : product.stock}</td>
                                <td>{editproduct && editproduct.id === product.id ? <input type="number" name="price" value={editproduct.price} onChange={handleInputChange} /> : product.price}</td>
                                <td>{editproduct && editproduct.id === product.id ? <input type="text" name="genero" value={editproduct.genero} onChange={handleInputChange} /> : product.genero}</td>
                                <td>{editproduct && editproduct.id === product.id ? <input type="text" name="category" value={editproduct.category} onChange={handleInputChange} /> : product.category}</td>
                                <td>
                                    {editproduct && editproduct.id === product.id ?
                                        <>
                                            <button onClick={handleSave}>keep</button>
                                            <button onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                        :
                                        <button onClick={() => handleEdit(product.id)} className={styles.iconoeditar}>Edit</button>
                                    }
                                    <button onClick={() => handleDelete(product.id)} className={styles.iconoeliminar}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
