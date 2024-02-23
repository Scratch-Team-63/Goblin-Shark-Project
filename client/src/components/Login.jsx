import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigationbar from './Navigationbar.jsx'
import { Input, Button } from "@nextui-org/react";

export default function Login() {
    const navigate = useNavigate();

    // initialize state
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // helper functions. use state to store input fields
    const handleChange = (event) => {
        event.preventDefault();
        console.log('user typing');
        // change state
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('user clicked login');

        // create copy of state
        const formDataClone = {...formData};
        console.log(`user input: ${formDataClone}`)

        // Asynchronous fetch request
        try {
            console.log('sending request to server...');
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formDataClone),
            });
            console.log('server responded');

            if (!response.ok) throw new Error('Login failed');

            // success
            console.log(`user ${formDataClone.username} succeessfully logged in`);

            // navigate
            navigate('/');

        // error handler
        } catch (err) {
            console.log('error is: ', err);
        }
    }


    // render to page
    return (
        <>
        <Navigationbar/>
        <div className="signupContainer flex w-full flex-wrap md:flex-nowrap gap-4">
            <h2>Login Page</h2>
            <form className="formContainer" onSubmit={handleSubmit}>
                <Input className="userFormItem" style={{ border: 'none'}} type="text" name="username" value={formData.username} placeholder="Enter your username" onChange={handleChange} required />
                <Input className="userFormItem" style={{ border: 'none'}} type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} required />
                <Button type="submit" color="primary" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg userFormItem" size="md" >Login!!</Button>
            </form>
        </div>
        </>
    );
};