import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@nextui-org/react";

// export default function Signup() {
//     const navigate = useNavigate();

//     // helper functions

//     // render to page
//     return (
//         <form>
//             <input type="text" placeholder="username"/>
//             <input type="password" placeholder="password"/>
//         </form>
//     );
// };

export default function Signup() {
    const navigate = useNavigate();

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="text" label="Username" placeholder="Enter your username" />
            <Input type="text" label="Password" placeholder="Enter your password" />
        </div>
    );
};
  

//password: upper case, lowercase, include one number, one special character and length 6
//option for frontend to take email address