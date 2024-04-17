import { useEffect, useState } from 'react';
import styles from '../css/products.module.css';
import axios from 'axios';

const ProductsAdmin = () => {
  const [editproduct, setEditproduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = 'https://proyectogrupalhenry-production-e8a4.up.railway.app';
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Añadimos el estado de totalPages

  const handleEdit = (productID) => {
    const productForEdit = products.find(product => product.id === productID);
    setEditproduct(productForEdit);
  };

  const handleDelete = async (productID) => {
    try {
      await axios.delete(`${API_URL}/admin/delete-product/${productID}`);
      getProducts(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!editproduct) return;
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}/admin/edit-product/${editproduct.id}`, editproduct);
      if (response.status === 200) {
        const updatedProducts = products.map(product =>
          product.id === editproduct.id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditproduct(null);
      } else {
        console.error('Error updating product:', response.data);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditproduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditproduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getProducts = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products?page=${page}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages); // Actualizamos totalPages con el valor recibido
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const siguientePagina = () => {
    setCurrentPage(currentPage + 1);
  };

  const anteriorPagina = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>All the products</h1>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          products.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Genero</th>
                  <th>Category</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index}</td>
                    <td>{editproduct && editproduct.id === product.id ? <input type="text" name="name" value={editproduct.name} onChange={handleInputChange} /> : product.name}</td>
                    <td>{editproduct && editproduct.id === product.id ? <input type="number" name="stock" value={editproduct.stock} onChange={handleInputChange} /> : product.stock}</td>
                    <td>{editproduct && editproduct.id === product.id ? <input type="number" name="price" value={editproduct.price} onChange={handleInputChange} /> : product.price}</td>
                    <td>{editproduct && editproduct.id === product.id ? <input type="text" name="genero" value={editproduct.genero} onChange={handleInputChange} /> : product.genero}</td>
                    <td>{editproduct && editproduct.id === product.id ? <input type="text" name="category" value={editproduct.category} onChange={handleInputChange} /> : product.category}</td>
                    <td>
                      {editproduct && editproduct.id === product.id ?
                        <>
                          <button className={styles.editbuttons} onClick={handleSave}>Save</button>
                          <button className={styles.editbuttons} onClick={handleCancelEdit}>Cancel</button>
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
          )
        )}

        <div className={styles.mainContainer}>
          <button onClick={anteriorPagina} className={styles.icon} disabled={currentPage === 1}>{'<'}</button>
          <span className={styles.pageText}>{`Page: ${currentPage}`}</span>
          <button onClick={siguientePagina} className={styles.icon} disabled={currentPage >= totalPages}>   {'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
