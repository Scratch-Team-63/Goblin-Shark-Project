import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigationbar from './Navigationbar.jsx'
import { Input, Button } from "@nextui-org/react";


export default function Signup() {
    const navigate = useNavigate();

    // initialize state
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // helper functions. use state to store input fields
    const handleChange = (event) => {
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
            // send fetch request to server
            // use axios??
            console.log('sending request to server...');
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

    
    const [isInvalid, setIsInvalid] = useState(true);

    useEffect(() => {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!formData.password.match(regex) ) {
            setIsInvalid((prevState) => {
                return true
            });
        }
        if (formData.password.length === 0) {
            setIsInvalid(() => {
                return false;
            });
        } 
        if (formData.password.match(regex) ) {
            setIsInvalid(() => {
                return false;
            });
        }
        
    }, [formData])

    // render to page
    return (
        <>
        <Navigationbar/>
        <div className="signupContainer flex w-full flex-wrap md:flex-nowrap gap-4">
            <h2>Sign Up Page</h2>
            <form className="formContainer"  onSubmit={handleSubmit}>
                <Input className="userFormItem" type="text" name="firstName" value={formData.firstName} placeholder="Enter your first name" onChange={handleChange} required style={{ border: 'none'}} />
                <Input className="userFormItem" type="text" name="lastName" value={formData.lastName} placeholder="Enter your last name" onChange={handleChange} required style={{ border: 'none'}}  />
                <Input className="userFormItem" type="text" name="username" value={formData.username} placeholder="Enter your username" onChange={handleChange} required style={{ border: 'none'}}  />
                <Input color={isInvalid && "danger"} style={{ border: 'none'}} errorMessage={isInvalid && "A minimum 8 characters password containing at least one uppercase, one lowercase, one number, and one special character are required."} className="userFormItem" type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} required   />
                <Button type="submit" color="primary" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg userFormItem" size="md">Sign up</Button>
            </form>
        </div>
        </>
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


