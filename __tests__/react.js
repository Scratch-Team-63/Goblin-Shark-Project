import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import { toBeInTheDocument, toHaveTextContent } from "@testing-library/jest-dom";

import axios from "axios";
import App from "../client/src/components/App.jsx";
import DisplayContainer from "../client/src/components/DisplayContainer.jsx";

describe("Unit testing React components", () => {
    describe("Restaurants", () => {
        // item.name
        // item.local_hours.operational
        // item.phone_number
        // item.logo_photos[0]
        // item.weighted_rating_value
        // item.address.street_addr
        // item.address.city
        // item.address.state
        // item.miles
        // item.is_open

        let restaurant;

        // mocking
        const card = [
            {
                name: "El Pollo Loco",
                local_hours: {
                    operational: {
                        Friday: "10:00AM - 08:30PM",
                        Monday: "10:00AM - 08:30PM",
                        Saturday: "10:00AM - 08:30PM",
                        Sunday: "10:00AM - 08:30PM",
                        Thursday: "10:00AM - 08:30PM",
                        Tuesday: "10:00AM - 08:30PM",
                        Wednesday: "10:00AM - 08:30PM",
                    },
                },
                phone_number: 14089846860,
                logo_photos: [],
                weighted_rating_value: 4.9,
                address: {
                    city: "San Jose",
                    country: "US",
                    lat: 37.3019127,
                    latitude: 37.3019127,
                    lon: -121.9503659,
                    longitude: -121.9503646,
                    state: "CA",
                    street_addr: "1229 South Winchester Boulevard",
                    street_addr_2: "",
                    zipcode: "95128",
                },
                miles: 0.19795308583349666,
                is_open: true,
                cuisines: (4)[
                    ("Comfort Food", "Latin American", "Mexican", "New American")
                ],
            },
        ];

        // testing

        beforeAll(() => {
          restaurant = render(<DisplayContainer fetchedData={card} />);
        });

        test("Renders the restaurant name and is bold", () => {
            expect(restaurant.getByText("El Pollo Loco")).toHaveStyle(
                "font-weight: bold"
            );
        });

        test("Renders the 'hours' button",  () => {
            // const button = restaurant.getAllByRole("ButtonTest", { hidden: true });
            const button = restaurant.find('button["role="ButtonTest"]');
            const parentButton = (text) => {
                return Popover.find(PopoverTrigger).filterWhere((field) => {
                  return PopoverTrigger.find('Button').text() === 'Hours';
                });
              }
              const titleField = findField('Type');
              expect(titleField.find('input').first().props().name).toBe('type');

            // const buttons = await restaurant.findAllByRole("button");
            console.log('this is button:', button);
            expect(button).toBeInTheDocument();
        });
        test('ALEX Test', () => {
            // const { container } = render((<YourComponent/>));
            /*                     ↓ ↓ ↓ the way you like to get all the elements you want to check for an attribute value  */
            const button = document.querySelectorAll('button').find(button => button.getAttribute('role') === 'ButtonTest');
            // expect(el) /* .toBeInTheDocument() for example */
            // const button =  restaurant.getAllByRole("ButtonTestContainer", { hidden: true });
            expect(button).toBeInTheDocument();
        })


        // Phone number is not actually being rendered. It returns from the API but is not used.
        // test("Renders the restaurant's phone number", () => {
        //     expect(restaurant.getByText("14089846860")).toBeInTheDocument();
        // })

        // Addre
        // test("Address is displayed", () => {
        //     const { street_addr } = card[0].address;
        //     expect(restaurant.getByText(street_addr)).toBeInTheDocument();
        // });

        xtest("Picture is displayed", () => { });
    });
});

// expect(restaurant.getByText('El Pollo Loco').closest('b')).toBeInTheDocument();

// dollar_signs :  1,
// food_photos : ['https://cdn-img.mealme.ai/97a22b633c2a6520946100e7…0646266643062633136306636333730666166332e6a706567'],
// is_open  :true,
// offers_first_party_delivery   :false,
// offers_third_party_delivery  :  true,
// pickup_enabled  : true,
// store_photos : [],
// supports_upc_codes  :false,
// type : "restaurant",
// _id:"7feb58a5-4970-4f38-8670-ab34c156517f",// dollar_signs :  1,
// food_photos : ['https://cdn-img.mealme.ai/97a22b633c2a6520946100e7…0646266643062633136306636333730666166332e6a706567'],
// is_open  :true,
// offers_first_party_delivery   :false,
// offers_third_party_delivery  :  true,
// pickup_enabled  : true,
// store_photos : [],
// supports_upc_codes  :false,
// type : "restaurant",
// _id:"7feb58a5-4970-4f38-8670-ab34c156517f",

// expect(restaurant.getByText("El Pollo Loco").nextSibling).toBe("El Pollo Loco");
// expect(restaurant.getByRole('El Pollo Loco').closest('b')).toBeInTheDocument();
// console.log(restaurant.getByText('El Pollo Loco').closest('b'))

// expect(restaurant.getByText("El Pollo Loco").toBe("La Polla Loca"));
// expect(restaurant.getByText("El Pollo Loco").nextSibling).toBeInstanceOf("Hours");
