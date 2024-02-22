import React from "react";
import { useState, useEffect } from "react";
import FavoriteCard from './favoriteCard.jsx';
import axios from "axios";

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
  Checkbox,
  user
} from "@nextui-org/react";
import { HeartIcon } from "../HeartIcon.jsx";


export default function DisplayContainer({ fetchedData }) {
  const [checked, setChecked] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isFlippedArray, setIsFlippedArray] = useState(
    new Array(fetchedData.length).fill(false)
  );



  // Function to flip the card at a specific index
  const flipCard = (index) => {
    console.log('FlipCard is called')
    setIsFlippedArray((prevfav) => {
      const newfav = [...prevfav];
      newfav[index] = !newfav[index];
      console.log('New fav', newfav)
      return newfav;
    });
  };


  //add functition to populate favorite


  function AddFavorite() {
    const [favoriteData, setFavoriteData] = useState({
        name: "",
        local_hours: { operational: {} },
        phone_number: "",
        logo_photos: [],
        weighted_rating_value: "",
        address: {
            city: "",
            country: "",
            lat: "",
            latitude: "",
            lon: "",
            longitude: "",
            state: "",
            street_addr: "",
            street_addr_2: "",
            zipcode: ""
        },
        miles: "",
        is_open: true,
        cuisines: [],
    });
  }


  

  // Fetch user favorites when the component mounts
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        // Make a GET request to fetch user favorites from the backend
        const response = await axios.get("/getuserfavorites");
        setUserFavorites(response.data); // Update fav with fetched favorites
        console.log('users data has been fetched');
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };
    fetchUserFavorites();
  }, []);



  //when favorite is clicked, the object that was clicked is added to userFavorites
  const handleFavoriteClick = async (item) => {

    console.log('HandleFavoriteClick called')
    try {
      // Make a POST request to add the clicked item to userFavorites
      await axios.post("/addUserFavorite", item);
      setUserFavorites([...userFavorites, item]);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
  };




  return (
    <>
    {/* favorites container */}
     <div id='favCon' > 
      <FavoriteCard favoritesArray={userFavorites} setChecked={setChecked} checked={checked}/>
     </div>

     {/* results container */}
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
                onChange={() => {setChecked; handleFavoriteClick(item)}}
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
                {item.address.fav}
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
    </>
   
  );
}
