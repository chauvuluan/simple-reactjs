import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

CreateCategory.propTypes = {
    
};

function CreateCategory(props) {
 const [form, setForm] = useState({
    name: '',
   
  });
  const navigate = useNavigate();
const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
    
        try {
          const res = await fetch('http://localhost:8081/category', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ...form
              
            })
          });
    
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to create category');
          }
          navigate('/');
    
          setSuccess(true);
          setForm({ name: '' });
        } catch (err) {
          setError(err.message);
        }
      };
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create New category</h2>
  
        {success && <p className="text-green-600 mb-2">Category created successfully!</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
        </form>
      </div>
    );
}

export default CreateCategory;