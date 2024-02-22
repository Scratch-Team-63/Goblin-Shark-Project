import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigationbar from './Navigationbar.jsx'
import { Input } from "@nextui-org/react";

export default function Login() {
    const navigate = useNavigate();

    // initialize state

    // helper functions. use state to store input fields
    const handleChange = () => {
        console.log('user typing');
        // change state
    }

    const handleSubmit = async () => {
        try {
            console.log('user clicked login');


        // error handler
        } catch (err) {
            console.log('error is: ', err);

        }
    }


    // render to page
    return (
        <>
        <Navigationbar/>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <form onSubmit={handleSubmit}>
                <Input type="text" name="username" value={formData.username} placeholder="Enter your username" onChange={handleChange} required />
                <Input type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} required />
                <button type="submit">Sign up</button>
            </form>
        </div>
        </>
    );
};