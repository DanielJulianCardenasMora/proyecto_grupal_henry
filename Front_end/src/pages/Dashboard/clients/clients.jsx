import styles from '../css/Clients.module.css'
import Sidebar from "../../../Components/Dashboard/sidebar";
import { useEffect, useState } from 'react';
import axios from 'axios';

const clients = () => {
  const [edituser, setEdituser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = 'https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/users-list'; 

  const handleEdit = (userID) => {
      const userForEdit = users.find(user => user.id === userID)
      setEdituser(userForEdit);
  }
  const handleDelete = (userID) => {
      //Ver despúes
  }
  const handleSave = () => {
      setEdituser(null);
  }
  const handleCancelEdit = () => {
      setEdituser(null);
  }
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEdituser(prevState => ({
          ...prevState,
          [name]: value
      }));
  }

  async function getUsers() {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      const users = response.data;
      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getUsers();
  }, []);



    return (
    <div>
      <div className={styles.container}>
      <div className={styles.mainContent}>
      <h1>Our customers</h1>
      {isLoading ? (
      <p>Loading users...</p>
      ) : (
      users.length > 0 && ( 
        <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Orders</th>
            <th>Edit</th>
          </tr>
        </thead>
                    
        <tbody>
        {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="name" value={edituser.name} onChange={handleInputChange} /> : user.name}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="email" value={edituser.email} onChange={handleInputChange} /> : user.email}</td>
          <td>{edituser && edituser.id === user.id ? <input type="number" name="password" value={edituser.password} onChange={handleInputChange} /> : user.password}</td>
          <td>{edituser && edituser.id === user.id ? <input type="number" name="phone" value={edituser.phone} onChange={handleInputChange} /> : user.phone}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="country" value={edituser.country} onChange={handleInputChange} /> : user.country}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="orders" value={edituser.orders} onChange={handleInputChange} /> : user.Orders}</td>
          <td>
            {edituser && edituser.id === user.id ?
              <>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
              :
              <button onClick={() => handleEdit(user.id)} className={styles.iconoeditar}>Edit</button>
            }
            <button onClick={() => handleDelete(user.id)} className={styles.iconoeliminar}>Delete</button>
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


export default clients