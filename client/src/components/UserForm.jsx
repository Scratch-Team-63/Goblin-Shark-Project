import React from 'react'
import {Button, ButtonGroup} from "@nextui-org/react";
import { Input } from "@nextui-org/react";


export default function UserForm () {
  const [budget, setBudget] = React.useState("");
  const [distance, setDistance] = React.useState("");
  console.log(distance, budget)

  return (
    <div className="inputFields">
        <Input budget={budget} onBudgetChange={setBudget} isRequired variant="bordered" radius="full" type="text" label="Stay within Budget" color="success" />
        <Input distance={distance} onDistanceChange={setDistance} variant="bordered" isRequired radius="full" type="text" label="Stay within Distance" color="success"/>
        <Button isRequired radius="full" color="primary" size="md" >Share Your Location</Button>
    </div>
  )
}