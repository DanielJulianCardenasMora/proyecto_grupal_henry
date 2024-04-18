import styles from '../css/Orders.module.css';
import Sidebar from '../../../Components/Dashboard/sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Orders = () => {
  const [editorder, setEditorder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar la visibilidad del diálogo
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para almacenar la orden seleccionada
  const [allDetails, setAllDetails] = useState([]); // Definir estado para almacenar detalles de todas las órdenes
  const API_URL = 'https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/orders';

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setOrders(response.data));
  }, []);

  useEffect(() => {
    const orderIds = orders.map((order) => order.id);

    const fetchDetails = async (orderId) => {
      const response = await axios.get(`/orders/${orderId}`);
      return response.data;
    };

    const allDetailsPromises = orderIds.map((orderId) => fetchDetails(orderId));

    Promise.all(allDetailsPromises).then((details) => {
      setAllDetails(details);
    });
  }, [orders]);

  const onClick = (orderID) => {
    const orderClicked = orders.find(order => order.id === orderID);
    setSelectedOrder(orderClicked);
    setDialogOpen(true); // Abre el diálogo al hacer clic en el botón
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setDialogOpen(false); // Cierra el diálogo
  };

  return (
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
                  <th>User name</th>
                  <th>User email</th>
                  <th>Review</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index}</td>
                    <td>{order.detalle}</td>
                    <td>{order.nameUser}</td>
                    <td>{order.email}</td>
                    <td>
                      <button className={styles.check} onClick={() => onClick(order.id)}>
                        Check detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
      {selectedOrder && dialogOpen && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            <p><strong>Id:</strong> {selectedOrder.id}</p>
            <p><strong>Detalle:</strong> {selectedOrder.detalle}</p>
            <p><strong>User name:</strong> {selectedOrder.nameUser}</p>
            <p><strong>User email:</strong> {selectedOrder.email}</p>
            <p><strong>Date:</strong> {selectedOrder.fecha}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
