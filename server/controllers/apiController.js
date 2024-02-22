const express = require('express');
const apiController = {}
const axios = require('axios');

const APIKey = '33947aed9eea45cebd7db089fdc3e7c0'

apiController.formatRequestData = async (req, res, next) => {
  console.log('formatRequestData');
  const {cuisine, budget, distance, latitude, longitude} = req.params
  // console.log(cuisine, budget, distance, latitude, longitude);
  try{
    if (cuisine !== 'string' || typeof budget !== 'number' || typeof distance !== 'number' || typeof latitude !== 'number' || typeof longitude !== 'number' ) {
      console.log('bad request active');
      return next({
        log:'Express error handler caught apiController.formatRequestData middleware error',
        status: 500,
        message: {err: 'Incomplete Fields!'}
      })
    }
    const apiResponseData = await axios.get(`https://api.spoonacular.com/food/restaurants/search?cuisine=${cuisine}&budget=${budget}&distance=${distance}&lat=${latitude}&lng=${longitude}&apiKey=${APIKey}`)

    //restaurantData will be an array of restaurant objects
    console.log(apiResponseData)
    res.locals.restaurantData = apiResponseData.data.restaurants
    return next()

  }catch (error){
    console.error('Error fetching data from API:', error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = apiController;