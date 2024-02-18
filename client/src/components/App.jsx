import React, { useState } from 'react'
import {NextUIProvider} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import UserForm from './UserForm.jsx';


function App (){
  const [displayData, setDisplayData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (cuisine, distance, budget, latitude, longitude) => {
    try {
      setErrorMessage('');
      console.log('User input successfully passed into App.jsx and about to make request to Server.js', )
      // Make the API request with the constructed optionSymbol
      const response = await axios.get(`/api/search/${cuisine}/${distance}/${budget}/${latitude}/${longitude}`);
      console.log(response.data);
      setDisplayData(response.data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setDisplayData(null);
      setErrorMessage('No contract found with given parameters.')
    }
  };

  return (
    <NextUIProvider>
      <h2>Hello! App works!</h2>
      <UserForm hitSearch={handleSearch}/>
    </NextUIProvider>
  );
}

export default App;