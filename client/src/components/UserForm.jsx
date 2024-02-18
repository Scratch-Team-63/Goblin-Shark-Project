import React, { useState } from 'react'
import {Input, Button, ButtonGroup} from "@nextui-org/react";
import DropDown from './DropDown.jsx';

export default function UserForm ({ hitSearch }) {
  const [cuisine, setCuisine] = useState('');
  const [distance, setDistance] = useState('');
  const [budget, setBudget] = useState('');
  // const [userInput, setUserInput] = useState('');
  // const [userInput, setUserInput] = useState('');
  // const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log('Submitting and about to make request to Server.js', cuisine, distance, budget);
    hitSearch(cuisine, distance, budget);
  };

  return (
    <div>
      <DropDown setCuisine={setCuisine}/>
      {/* <Input onChange={(e) => setCuisine(e.target.value)} size="md" label="Whatcha in the mood for?" labelPlacement="outside"placeholder="cuisine (i.e. Italian, Mexican, Chinese)"/> */}
      <Input onChange={(e) => setDistance(e.target.value)} size="md" label="How close does it need to be?" labelPlacement="outside" placeholder="distance (in miles)"/>
      {/* add maximum distance */}
      <Input onChange={(e) => setBudget(e.target.value)} size="md" label="How much are you tryna spend?" labelPlacement="outside" placeholder="budget (in USD)"/>
      <Button onPress={handleSubmit}radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" size="md" >Find Restaurants!</Button>
    </div>
  )
}