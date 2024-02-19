import React from 'react';
import { Card, CardBody, CardFooter, Image }  from '@nextui-org/react'

export default function DisplayContainer({fetchedData}){
    // const listOfRes = [ {name: 'Mexican', img: "https://media.istockphoto.com/id/876560704/photo/fuji-japan-in-spring.jpg?s=612x612&w=0&k=20&c=j1VZlzfNcsjQ4q4yHXJEohSrBZJf6nUhh2_smM4eioQ=", distance: "12mi"}, {name: "Italian", img: "https://media.istockphoto.com/id/1390815938/photo/tokyo-city-in-japan.jpg?s=612x612&w=0&k=20&c=VHiC3TlbXkb-Yf6WUYjh825Y0nGMCTkNUa9j8X8rVfY=", distance: "8mi"}]


    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
         {fetchedData.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[140px]"
              src={item.logo_photos[0]}
            />
            </CardBody>
            <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <h2>Test!</h2>
            <p className="text-default-500">{item.distance}</p>
          </CardFooter>
        </Card>
      ))}
      </div>
    );
};
