import React, { useState } from 'react';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [event, setEvent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, age, event };

    // My form submission logic
    console.log(formData);
  };
    // requred doesnt let the use to leave empty fields
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /> 
      </label> 
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
  Age:
  <input
    type="number"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    min={16} 
    max={120} 
    required
  />
</label>

      <label>
        Event:
        <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
