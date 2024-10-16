import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin1.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'User' && password === 'Pass') {
            navigate('/landing');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        
        <div>
            <h2 style={{justifyContent:"center"}}>Threads APP</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
