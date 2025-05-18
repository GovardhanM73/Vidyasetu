import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
    phone: string;
    location: string;
    avatar: string;
    bio: string;
  }>({
    name: '',
    email: '',
    password: '',
    role: 'student',
    phone: '',
    location: '',
    avatar: '',
    bio: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(formData);
    setMessage(res.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {message && <p className="text-center text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="bio"
          type="text"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
