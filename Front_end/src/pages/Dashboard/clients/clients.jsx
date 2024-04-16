import styles from '../css/Clients.module.css'
import Sidebar from "../../../Components/Dashboard/sidebar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const clients = () => {
  const [edituser, setEdituser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = 'https://proyectogrupalhenry-production-e8a4.up.railway.app';
  const [superAdmin, setSuperAdmin] = useState(false)
  const handleEdit = (userID) => {
    const userForEdit = users.find(user => user.email === userID)
    setEdituser(userForEdit);
  }


  const handleDelete = async (userEmail) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/delete-users/${userEmail}`);
      getUsers()
    } catch (error) {
      console.error(error);
    }
  }
  const handleSave = async () => {
    if (!edituser) return;
    setIsLoading(true);
    try {
      const updatedProduct = {
        ...edituser,
      };
      console.log(edituser)
      const response = await axios.put(`${API_URL}/users/${edituser.email}`, updatedProduct);

      if (response.status === 200) {
        const updatedProducts = users.map(product =>
          product.id === edituser.id ? response.data : product // Replace edited product
        );
        setUsers(updatedProducts);
        setEdituser(null);
        getUsers();
      } else {
        console.error('Error updating product:', response.data);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleCancelEdit = () => {
    setEdituser(null);
  };
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
      const response = await axios.get(`${API_URL}/admin/users-list`);
      const users = response.data;
      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
    const rol = localStorage.getItem("role")

    if (rol == 'superadmin') {
      setSuperAdmin(true)
    }

  }, []);


  const handleClickAdmin = async (user) => {
    if (user.role == "admin") {
      if (
        confirm(`Are you sure you want to remove the admin from ${user.email} ?`)
      ) {
        const userData = { role: "user" };
        const { data } = await axios.put(
          `https://proyectogrupalhenry-production-e8a4.up.railway.app/users/${user.email}`,
          userData
        );
        getUsers();
        return;
      }
    } else {
      if (confirm(`Are you sure you want to make admin to ${user.email} ?`)) {
        const userData = { role: "admin" };
        const { data } = await axios.put(
          `https://proyectogrupalhenry-production-e8a4.up.railway.app/users/${user.email}`,
          userData
        );
        getUsers();
        return;
      }
    }
  };
  const handleActivateDeactivate = async (user) => {
    const isActive = user.active;

    if (isActive) {
      if (confirm(`¿Estás seguro de que deseas desactivar ${user.email}?`)) {
        const userData = { active: false };
        await updateUser(user.email, userData);
        getUsers();
      }
    } else {
      if (confirm(`¿Estás seguro de que deseas activar ${user.email}?`)) {
        const userData = { active: true };
        await updateUser(user.email, userData);
        getUsers();
      }
    }
  };

  const handleDeactivateUser = async (user) => {
    if (confirm(`¿Estás seguro de que deseas desactivar ${user.email}?`)) {
      const userData = { active: false };
      await updateUser(user.email, userData);
      getUsers();
    }
  };


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
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index}</td>
                    <td>
                      {edituser && edituser.id === user.id ? (
                        <input
                          type="text"
                          name="name"
                          value={edituser.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {edituser && edituser.id === user.id ? (
                        <input
                          type="text"
                          name="email"
                          value={edituser.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {edituser && edituser.id === user.id ? (
                        <input
                          type="number"
                          name="password"
                          value={edituser.password}
                          onChange={handleInputChange}
                        />
                      ) : (
                        "********"
                      )}
                    </td>
                    <td>
                      {edituser && edituser.id === user.id ? (
                        <input
                          type="number"
                          name="phone"
                          value={edituser.phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td>
                      {edituser && edituser.id === user.id ? (
                        <input
                          type="text"
                          name="country"
                          value={edituser.country}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.country
                      )}
                    </td>
                    <td>
                      {edituser && edituser.id === user.id ? (
                        <div>
                          <button
                            className={styles.editbuttons}
                            onClick={handleSave}
                          >
                            Save
                          </button>
                          <button
                            className={styles.editbuttons}
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(user.email)}
                          className={styles.iconoeditar}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.email)}
                        className={styles.iconoeliminar}
                      >
                        Delete
                      </button>
                      {superAdmin ? (
                        <button
                          className={styles.iconoAdmin}
                          onClick={() => handleClickAdmin(user)}
                        >
                        </button>
                      ) : (
                        <></>
                      )}
                      {user.active ? (
                        <button onClick={() => handleActivateDeactivate(user)} className={styles.iconDesac}>
                          <FontAwesomeIcon icon={faEye} style={{ marginRight: '5px' }} />
                          {user.active ? "Desactivar" : "Activar"}
                        </button>
                      ) : (
                        <button onClick={() => handleDeactivateUser(user)} className={styles.iconDesac}>
                          <FontAwesomeIcon icon={faEyeSlash} style={{ marginRight: '5px' }} />
                          Desactivar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}


export default clients