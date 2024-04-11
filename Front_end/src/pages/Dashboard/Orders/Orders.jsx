import styles from '../css/Orders.module.css'
import Sidebar from "../../../Components/Dashboard/sidebar";

import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [editorder, setEditorder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = 'https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/orders'; 

  const handleEdit = (orderID) => {
      const orderForEdit = orders.find(order => order.id === orderID)
      setEditorder(orderForEdit);
  }
  const handleDelete = (orderID) => {
      //Ver despúes
  }
  const handleSave = () => {
      setEditorder(null);
  }
  const handleCancelEdit = () => {
      setEditorder(null);
  }
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditorder(prevState => ({
          ...prevState,
          [name]: value
      }));
  }

  async function getOrders() {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      const orders = response.data;
      setOrders(orders);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getOrders();
  }, []);



  // const [orders, setOrders] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  
  useEffect(() => {
    // Obtener todas las ordenes
    axios.get(`${API_URL}admin/orders`)
      .then((response) => setOrders(response.data));
  }, []);
  
  useEffect(() => {
    // Obtener detalles de cada orden
    const orderIds = orders.map((order) => order.id);
  
    const fetchDetails = async (orderId) => {
      const response = await axios.get(`/orderDetail/${orderId}`);
      return response.data;
    };
  
    const allDetailsPromises = orderIds.map((orderId) => fetchDetails(orderId));
  
    Promise.all(allDetailsPromises).then((details) => {
      setAllDetails(details);
    });
  }, [orders]);
  
  const combinedData = orders.map((order) => {
    const orderDetails = allDetails.find((detail) => detail.id === order.id);
    return { ...order, ...orderDetails };
  });








    return (
    <div>
      <div className={styles.container}>
      <div className={styles.mainContent}>
      <h1>Our orders</h1>
      {isLoading ? (
      <p>Loading orders...</p>
      ) : (
      orders.length > 0 && ( 
        <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Detalle</th>
          </tr>
        </thead>
                    
        <tbody>
        {orders.map(order => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{editorder && editorder.id === order.id ? <input type="text" name="id" value={editorder.id} onChange={handleInputChange} /> : order.id}</td>
          <td>{editorder && editorder.id === order.id ? <input type="text" name="detalle" value={editorder.detalle} onChange={handleInputChange} /> : order.detalle}</td>
          <td>
            {editorder && editorder.id === order.id ?
              <>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
              :
              <button onClick={() => handleEdit(order.id)} className={styles.iconoeditar}>Edit</button>
            }
            <button onClick={() => handleDelete(order.id)} className={styles.iconoeliminar}>Delete</button>
          </td>
        </tr>
        ))}
        </tbody>
        </table>
      ))}
      </div>
      </div>
   
    </div>
  );
}


export default Orders