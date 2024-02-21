import React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Checkbox
} from "@nextui-org/react";
import { HeartIcon } from "../HeartIcon.jsx";


export default function DisplayContainer({ fetchedData }) {
  const [checked, setChecked] = useState(false);
  const [isFlippedArray, setIsFlippedArray] = useState(
    new Array(fetchedData.length).fill(false)
  );

  // Function to flip the card at a specific index
  const flipCard = (index) => {
    console.log('FlipCard is called')
    setIsFlippedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      console.log('New State', newState)
      return newState;
    });
  };

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 displayContainer">
      {fetchedData.map((item, index) => (
        <div
          className={`card ${isFlippedArray[index] ? "is-flipped" : ""}`}
          onClick={() => flipCard(index)}
          key={index}
        >
          {/* <div className="front"> */}
          <Card
            className="restaurant"
            shadow="sm"
            key={index}
            isPressable
            onPress={() => {
              console.log("card Pressed", index);
              flipCard(index);
            }}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start items-center justify-center">
            <div className="flex items-center">
              <Checkbox
                checked={checked}
                onChange={setChecked}
                description={checked ? 'Unfavorite' : 'Favorite'}
                icon={<HeartIcon filled={checked} />}
              />
              <b className="font-bold text-large ml-1">{item.name}</b>
            </div>
              <Popover placement="bottom" showArrow>
                <PopoverTrigger>
                  <Button>Hours</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">
                      <b>Operational Hours</b>
                    </div>
                    {Object.keys(item.local_hours.operational)
                      .sort((a, b) => {
                        const daysOfWeek = [
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ];
                        return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
                      })
                      .map((key) => (
                        <div key={key} className="text-tiny">
                          {`${key}: ${item.local_hours.operational[key]}`}
                        </div>
                      ))}
                    <p className="text-tiny uppercase font-bold">
                      Phone: {item.phone_number}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <Divider />
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[140px] restaurantImage"
                src={item.logo_photos[0]}
              />
            </CardBody>
            <Divider />
            <CardFooter className="text-small justify-between restaurantFooter">
              <p>
                <b>★ {Number(item.weighted_rating_value).toFixed(2)} Rating</b>
              </p>
              <p className="text-default-500">
                {item.address.street_addr}
                {", "}
                {item.address.city}
                {", "}
                {item.address.state}
                {", "}
                {item.miles.toFixed(2)}
                {" mi away, "}Is open: {item.is_open ? "Yes" : "No"}
              </p>
            </CardFooter>
          </Card>
        {/* </div> */}
        <div className="back">
        </div>
        </div>
      ))}
    </div>
  );
}

//hello world
