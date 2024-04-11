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

  // async function getUsers() {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(API_URL);
  //     const users = response.data
  //     setUsers(users);
  //     console.log(users)
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  
  useEffect(() => {
    // getUsers();

    setUsers([{
      name: 'Ludmila',
      email:'lurm@algo',
      password: 123456,
      phone:222222,
      country:'Arg',
      Orders: []
    }])
  }, []);

  console.log(users);



    return (
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
            <th>#</th>
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
          
        {users.map((user, index) => (
        <tr key={user.id}>
          <td>{index}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="name" value={edituser.name} onChange={handleInputChange} /> : user.name}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="email" value={edituser.email} onChange={handleInputChange} /> : user.email}</td>
          <td>{edituser && edituser.id === user.id ? <input type="number" name="password" value={edituser.password} onChange={handleInputChange} /> : '********'}</td>
          <td>{edituser && edituser.id === user.id ? <input type="number" name="phone" value={edituser.phone} onChange={handleInputChange} /> : user.phone}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="country" value={edituser.country} onChange={handleInputChange} /> : user.country}</td>
          <td>{edituser && edituser.id === user.id ? <input type="text" name="orders" value={edituser.Orders.length} onChange={handleInputChange} /> : user.Orders.length}</td>
          <td>
            {edituser && edituser.id === user.id ?
              <div >
                <button className={styles.editbuttons} onClick={handleSave}>Save</button>
                <button  className={styles.editbuttons} onClick={handleCancelEdit}>Cancel</button>
              </div>
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
  );
}


export default clients