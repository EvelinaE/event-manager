import { useState } from 'react';
import './RegistrationForm.css';
import Button from './Button';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [event, setEvent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, age, event };

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('You successfully registered the user!');
        window.location.href = '/users-list';
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Oh no! Something went wrong. Grab a cup of coffee and try again!');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
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
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min={16} max={120} required />
      </label>
      <label>
        Event:
        <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} required />
      </label>
      <Button text="Submit" type="submit" />
    </form>
  );
};

export default RegistrationForm;
