import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import MainContainer from './MainContainer.jsx'
function App (){
  

  return (
    <NextUIProvider>
      <MainContainer/>
    </NextUIProvider>
  );
}

export default App;