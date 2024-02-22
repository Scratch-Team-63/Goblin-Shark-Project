import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import MainContainer from './MainContainer.jsx'
import Navigationbar from './Navigationbar.jsx'
function App (){


  return (
    <NextUIProvider>
      <Navigationbar/>
      <MainContainer/>
    </NextUIProvider>
  );
}

export default App;