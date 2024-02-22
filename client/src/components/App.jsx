import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {NextUIProvider} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import MainContainer from './MainContainer.jsx'
import Navigationbar from './Navigationbar.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function App (){

  return (
    <NextUIProvider>
    <Router>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<Signup />}/>
        <Route path="/main" element={<MainContainer />} />
      </Routes>
    </Router>
  </NextUIProvider>
  );
}

export default App;