const express = require('express');
const apiController = {}
const axios = require('axios');
// import axios from 'axios';

const APIKey = 'defaa8ca6e284a7a8f4ab022633fd8f5'

apiController.formatRequestData = async (req, res, next) => {
  const {cuisine, budget, distance, latitude, longitude} = req.params
  try{
    if (!cuisine || !budget || !distance || !latitude || !longitude) {
      return next({
        log:'Express error handler caught apiController.formatRequestData middleware error',
        status: 500,
        message: {err: 'Incomplete Fields!'}
      })
    }
    const apiResponseData = await axios.get(`https://api.spoonacular.com/food/restaurants/search?cuisine=${cuisine}&budget=${budget}&distance=${distance}&lat=${latitude}&lng=${longitude}&apiKey=${APIKey}`)

    //restaurantData will be an array of restaurant objects
    res.locals.restaurantData = apiResponseData.restaurants
    return next()

  }catch (error){
    console.error('Error fetching data from API:', error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = apiController;