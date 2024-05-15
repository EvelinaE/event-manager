import PropTypes from 'prop-types';
import Button from './Button'; 
import './EditForm.css'; 

const EditForm = ({ user, handleUpdate, handleChange, cancelEdit }) => {
  return (
    <div className="edit-form">
      <form onSubmit={handleUpdate}>
        <h3>Edit User</h3>
        <label>
          Name:
          <input type="text" name="name" value={user.name || ''} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email || ''} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={user.age || ''} onChange={handleChange} min={16} max={120} required />
        </label>
        <label>
          Event:
          <input type="text" name="event" value={user.event || ''} onChange={handleChange} required />
        </label>
        <div className="button-container">
          <Button text="Update" type="submit" />
          <Button text="Cancel" onClick={cancelEdit} />
        </div>
      </form>
    </div>
  );
};

EditForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default EditForm;
