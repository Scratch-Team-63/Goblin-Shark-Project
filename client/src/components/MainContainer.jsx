import React, { useState } from 'react';
import DisplayContainer from './DisplayContainer.jsx'
import UserForm from './UserForm.jsx';
import axios from 'axios'

export default function MainContainer () {

    const [displayData, setDisplayData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSearch = async (cuisine, distance, budget, latitude, longitude) => {
      try {
        setErrorMessage('');
        console.log('User input successfully passed into App.jsx and about to make request to Server.js', )
        // Make the API request with the constructed optionSymbol
        const response = await axios.get(`/api/search/${cuisine}/${distance}/${budget}/${latitude}/${longitude}`);
        console.log(response)
        console.log(response.data);
        setDisplayData(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setDisplayData([]);
        setErrorMessage('No contract found with given parameters.')
      }
    };

    return(
        <div>
            <UserForm hitSearch={handleSearch}/>
            <DisplayContainer fetchedData={displayData}/>
        </div>
    )
}