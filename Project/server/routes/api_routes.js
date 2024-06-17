const express = require('express');
const Restaurant = require('../models/restaurant');
const verify = require('../middle-ware/verifyToken');
const UserPreferences = require('../models/userPreferences');

const router = express.Router();

// router.use(verify);   //check to see if the user is authenticated

router.get('/restaurants', async (req, res) => {

   try {
      // Get pagination parameters from query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate the starting index
      const startIndex = (page - 1) * limit;

      const restaurants = await Restaurant.find()
          .skip(startIndex)
          .limit(limit);

      // Get total count of documents for pagination metadata
      const totalCount = await Restaurant.countDocuments();

      res.status(200).json({
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          data: restaurants
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.post('/restaurants', async (req, res) => {


   console.log(req.session.userId);
   const restaurant = new Restaurant({
      user: req.session.userId,         //relation to a user 
      name: req.body.name,
      foodType: req.body.foodType,
      price: req.body.price,
      rating: req.body.rating,
      description:req.body.description
   });

   try {
      const savedRestaurant = await restaurant.save();
      res.json(savedRestaurant);
   } catch (err) {
      console.log(err);
   }

});

router.get('/restaurants/:id', async (req, res) => {
   try {
      const restaurants_id = await Restaurant.findById(req.params.id);
      res.json(restaurants_id);

   } catch (err) {
      console.log(err);
   }

});

router.delete('/restaurants/:id', async (req, res) => {

   const restaurant = await Restaurant.findById({ _id: req.params.id });

   if (!restaurant)
      return res.status(404).send('not found')


   if (req.session.userId != restaurant.user) return res.status(400).send('denied')

   try {
      const removedRestaurant = await Restaurant.deleteOne({ _id: req.params.id });
      res.json(removedRestaurant);
   } catch (err) {
      console.log(err);
   }

});

router.patch('/restaurants/:id', async (req, res) => {

   const restaurant = await Restaurant.findById({ _id: req.params.id });

   if (!restaurant)
      return res.status(404).send('not found')

   
   if (req.session.userId!= restaurant.user) return res.status(400).send('denied')

   try {
      const updatedRestaurant = await Restaurant.updateOne(
         { _id: req.params.id }, 
         { $set: {
            name: req.body.name,
            foodType: req.body.foodType,
            price: req.body.price,
            rating: req.body.rating,
            description:req.body.description
            } 
         });
      res.json(updatedRestaurant);
   } catch (err) {
      console.log(err);
   }

});


router.get('/prefernces', async (req, res) => {

   try {
      // Get pagination parameters from query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate the starting index
      const startIndex = (page - 1) * limit;

      const prefernces = await UserPreferences.find()
          .skip(startIndex)
          .limit(limit);

      // Get total count of documents for pagination metadata
      const totalCount = await UserPreferences.countDocuments();

      res.status(200).json({
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          data: prefernces
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.post('/prefernces', async (req, res) => {

   console.log(req.session.userId);
   const prefernces = new UserPreferences({

      user: req.session.userId,         //relation to a user 
      foodType: req.body.foodType,
      price: req.body.price,
      rating: req.body.rating,
   });

   try {
      const savedPrefernces = await prefernces.save();
      res.json(savedPrefernces);
   } catch (err) {
      console.log(err);
   }

});

module.exports = router;