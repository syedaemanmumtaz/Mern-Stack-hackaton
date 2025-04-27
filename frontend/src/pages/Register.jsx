import { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // 1. Make the API request
      const response = await api.post('/auth/register', formData);
      
      // 2. Check if response exists and has data
      if (response && response.data) {
        // 3. Store the token and redirect
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      // 4. Handle different error cases
      if (err.response) {
        // Server responded with error status (4xx, 5xx)
        setError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        // Request was made but no response received
        setError('Server not responding. Is your backend running?');
      } else {
        // Other errors
        setError('An unexpected error occurred');
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Your form fields */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;