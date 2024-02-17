import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import UserForm from './UserForm.jsx';

function App (){

  return (
    <NextUIProvider>
      <h2>Hello! App works!</h2>
      <UserForm/>
    </NextUIProvider>
  );
}

export default App;