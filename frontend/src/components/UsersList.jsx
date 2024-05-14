import React, { useEffect, useState } from 'react';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete user. Check console for more details.');
    }
  };

  const handleEdit = (user) => {
    console.log("Editing user:", user);
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, ...updateData } = editingUser;
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: _id, ...updateData }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user._id === _id ? updatedUser : user)));
        setEditingUser(null);
      } else {
        const errorText = await response.text();
        throw new Error(`Update failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update user. Check console for more details.');
    }
  };

  const handleChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="users-container">
      <div className="users-list">
        <h2>Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.event}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="edit-form">
          <form onSubmit={handleUpdate}>
            <h3>Edit User</h3>
            <label>
              Name:
              <input type="text" name="name" value={editingUser.name || ''} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editingUser.email || ''} onChange={handleChange} required />
            </label>
            <label>
              Age:
              <input type="number" name="age" value={editingUser.age || ''} onChange={handleChange} min={16} max={120} required />
            </label>
            <label>
              Event:
              <input type="text" name="event" value={editingUser.event || ''} onChange={handleChange} required />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersList;
