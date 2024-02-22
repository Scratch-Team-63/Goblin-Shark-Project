import React, { useState } from 'react'
import { HeartIcon } from "../HeartIcon.jsx";

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
  



export default function FavoriteCard({favoritesArray}) {
    const [checked, setChecked] = useState(true);
    console.log('favoritesArray', favoritesArray)

    // const card = [{
    //     name: "McDonalds",
    //     local_hours: {operational: {
    //         Friday: "10:00AM - 08:30PM",
    //         Monday: "10:00AM - 08:30PM",
    //         Saturday: "10:00AM - 08:30PM",
    //         Sunday: "10:00AM - 08:30PM",
    //         Thursday: "10:00AM - 08:30PM",
    //         Tuesday: "10:00AM - 08:30PM",
    //         Wednesday: "10:00AM - 08:30PM"
    //         }},
    //     phone_number: 14089846860,
    //     logo_photos: [],
    //     weighted_rating_value: 4.9,
    //     address: {
    //         city: "San Jose",
    //         country: "US",
    //         lat: 37.3019127,
    //         latitude: 37.3019127,
    //         lon: -121.9503659,
    //         longitude: -121.9503646,
    //         state: "CA",
    //         street_addr: "1229 South Winchester Boulevard",
    //         street_addr_2: "",
    //         zipcode: "95128"
    //         },
    //     miles: 0.19795308583349666,
    //     is_open: true,
    //     cuisines: (4) ['Comfort Food', 'Latin American', 'Mexican', 'New American'],
    // }];

  return (
    <div >
      {favoritesArray.map((item, index) => (
        <div
          key={index}
        >
          {/* <div className="front"> */}
          <Card
            className="restaurant"
            shadow="sm"
            key={index}
            isPressable
            onPress={() => {
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
  )
}
