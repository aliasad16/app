// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome!</h1>
                <p className="mb-8 text-gray-600 text-lg">Please choose an option below:</p>
                <div className="flex flex-col space-y-4">
                    <Link 
                        to="/login" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                        Signup
                    </Link>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Home;
