import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import UserForm from './UserForm.jsx';
import DisplayContainer from './DisplayContainer.jsx'
function App (){

  return (
    <div className="mainContainer">
    <NextUIProvider>
      <h2>Hello! App works!</h2>
      <UserForm/>
      <DisplayContainer/>
    </NextUIProvider>
    </div>
  );
}

export default App;