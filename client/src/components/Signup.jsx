import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@nextui-org/react";


export default function Signup() {
    const navigate = useNavigate();

    // initialize state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });

    // helper functions. use state to store input fields
    const handleChange = event => {
        event.preventDefault();
        
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('user clicked submit');

        // create copy of state
        const formDataClone = {...formData};
        console.log(`user input: ${formDataClone}`)

        // do checks for password
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (!formDataClone.password.match(regex)) throw new Error ('Password must require...');


        // Asynchronous fetch request
        try {
            console.log('sending request to server...');

            // send fetch request to server
            // use axios??
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formDataClone),
            });
            console.log('server responded');

            if (!response.ok) throw new Error('Registration failed');

            // success
            console.log(`user ${formDataClone.username} succeessfully created`);

            // navigate
            navigate('/login');

        
        // Error handler
        } catch (err) {
            console.log('error is: ', err);
        }
    }

    // render to page
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <form onSubmit={handleSubmit}>
                <Input type="text" name="firstName" value={formData.firstName} placeholder="Enter your first name" onChange={handleChange} required />
                <Input type="text" name="lastName" value={formData.lastName} placeholder="Enter your last name" onChange={handleChange} required />
                <Input type="text" name="username" value={formData.username} placeholder="Enter your username" onChange={handleChange} required />
                <Input type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} required />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};
  

//password: upper case, lowercase, include one number, one special character and length 6
//option for frontend to take email address


// const userObject = {
//     firstname: firstName,
//     lastName: lastName,
//     username: username,
//     password: password
// }


