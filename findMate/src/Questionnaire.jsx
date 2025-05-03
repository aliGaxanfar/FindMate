import React, { useState } from 'react';

export default function Questionnaire() {
  const [form, setForm] = useState({
    city: '',
    age: '',
    interests: '',
    traits: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Roommate Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <input name="city" placeholder="City" onChange={handleChange} /><br /><br />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} /><br /><br />
        <input name="interests" placeholder="Interests" onChange={handleChange} /><br /><br />
        <textarea name="traits" placeholder="Describe yourself" onChange={handleChange} /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
