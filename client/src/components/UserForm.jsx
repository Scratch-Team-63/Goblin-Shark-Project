import React, { useState, useEffect } from 'react'
import {Input, Button, ButtonGroup} from "@nextui-org/react";
import DropDown from './DropDown.jsx';

export default function UserForm ( { hitSearch } ) {
  const [cuisine, setCuisine] = useState('');
  const [distance, setDistance] = useState('');
  const [budget, setBudget] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('')
  const [incompleteFields, setIncompleteFields] = useState(false);

  const handleSubmit = (e) => {
    const successCallback = (position) => {
      console.log(position)
      console.log(position.coords)
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    }
    const errorCallback = (error) => {
      console.log('ERROR IN GETTING USER LOCATION', error.message);
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  };

  useEffect(() => {
    console.log('Submitting and about to make request to Server.js', cuisine, distance, budget, latitude, longitude);
      hitSearch(cuisine, distance, budget, latitude, longitude);
  },[latitude, longitude]);

  return (
    <div>
      {incompleteFields && <h2 style={{color: 'red'}}>Incomplete Fields!</h2>}
      <DropDown setCuisine={setCuisine}/>
      <Input onChange={(e) => setDistance(e.target.value)} size="md" label="How close does it need to be?" labelPlacement="outside" placeholder="distance (in miles)"/>
      {/* add maximum distance */}
      <Input onChange={(e) => setBudget(e.target.value)} size="md" label="How much are you tryna spend?" labelPlacement="outside" placeholder="budget (in USD)"/>
      {/* <UserLocation setLatitude={(latitude) => setLatitude(latitude)} setLongitude={(longitude) => setLongitude(longitude)}/> */}
      <Button onPress={handleSubmit} radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" size="md" >Find Restaurants!</Button>
    </div>
  )
}

//conditional
// if (!cuisine || ! distance || !budget || !latitude || !longitude) {
//   setIncompleteFields(true);
// } else {
//   setIncompleteFields(false);
