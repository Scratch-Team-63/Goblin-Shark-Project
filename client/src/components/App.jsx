import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NextUI from './NextUI.jsx';
// import Register from './Register.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<NextUI />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;