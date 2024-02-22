import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){

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