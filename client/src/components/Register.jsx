import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){

    const navigate = useNavigate();

    // helper functions


    // render to page
    return (
        <form>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
        </form>
    );
};