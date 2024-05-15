import React, { useEffect, useState } from 'react';
import './UsersList.css';
import Button from './Button';
import EditForm from './EditForm';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
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
      alert('Failed to delete user. Grab a cup of coffee and try again!');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        setEditingUser(null);
      } else {
        const errorText = await response.text();
        throw new Error(`Update failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update user. Grab a cup of coffee and try again!');
    }
  };

  const handleChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="users-container">
      <div className="users-list">
        <h2 className="users-title">Registered Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Event</th>
              <th>Options</th>
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
                  <div className="button-container">
                    <Button text="Edit" onClick={() => handleEdit(user)} />
                    <Button text="Delete" onClick={() => handleDelete(user._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <EditForm
          user={editingUser}
          handleUpdate={handleUpdate}
          handleChange={handleChange}
          cancelEdit={cancelEdit}
        />
      )}
    </div>
  );
};

export default UsersList;
