import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg p-10 rounded-lg shadow-2xl max-w-lg w-full text-center">
                <h1 className="text-5xl font-extrabold text-white mb-6 animate-pulse">Welcome to the Adventure!</h1>
                <p className="mb-8 text-lg text-white">
                    Your journey to something amazing starts here. Are you ready to explore?
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <Link 
                        to="/login" 
                        className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:rotate-2"
                    >
                        Log In
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:-rotate-2"
                    >
                        Sign Up
                    </Link>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-white">
                        Already on board? <Link to="/login" className="underline hover:text-yellow-300">Log back in</Link> and continue your adventure!
                    </p>
                </div>
            </div>

            <div className="absolute bottom-10 text-center">
                <p className="text-sm text-white opacity-70">
                    "The greatest adventure is what lies ahead." 
                </p>
            </div>
        </div>
    );
}

export default Home;
