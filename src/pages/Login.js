import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(''); // Reset the error message
        setMessage(''); // Reset the success message

        try {
            const response = await fetch('https://ebd83320-70dc-40bc-8ad4-00ffe6338376.mock.pstmn.io/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();  // Parse the response

            if (response.ok) {
                // If the response is successful (status 200-299)
                setMessage('Login successful! Redirecting...');  // Success message
                localStorage.setItem('user', JSON.stringify(data.user));  // Save user data to localStorage

                onLogin();  // Call the onLogin function passed as prop
                setTimeout(() => {
                    navigate('/dashboard');  // Redirect to the dashboard after 2 seconds
                }, 2000);
            } else {
                // If the response is not successful, show the error message
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            // If there is an issue with the fetch request (network error, etc.)
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300 w-full"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
