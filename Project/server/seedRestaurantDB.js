const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant.js');

mongoose.connect('mongodb://localhost:27017/RestaurantRec', { useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => {console.log("MONGO CONNECTION OPEN!!!")})
    .catch(err => {console.log("OH NO MONGO CONNECTION ERROR!!!!")})

const seedRestaurants = [
    {name: 'Canteen All day Bar Restaurant', foodType: 'European', price: 'High', rating: 4.2, description: 'This restaurant offers quality food from across Europe, with occasional special weekends, where they serve food from a random european country.'},
    {name: 'Crats Fried Chicken Egnatia', foodType: 'Fast Food', price: 'Low', rating: 4.2, description: 'A fast food restaurant which specializes in fried chicken, available for takeout as well.' },
    {name: 'Taco Mazama', foodType: 'Mexican', price: 'Medium', rating: 4.7, description: 'Closest you will get to tasty Mexican food outside of Mexico!'},
    {name: 'Mongo Asian Food', foodType: 'Asian', price: 'Medium', rating: 4.2, description: 'True to its name, Mongo Asian Food offers a variety of culinary dishes from the Far East.'},
    {name: 'Asian House', foodType: 'Asian', price: 'Medium', rating: 4.4, description: 'A delightful restaurant which offers a plethora of Asian dishes, ranging from Japanese to Thai.'},
    {name: 'The Dubliner', foodType: 'European', price: 'Medium', rating: 4.6, description: 'A place to kick back with some beer from the british isles along with some authentic food from the region.' },
    {name: 'Kritikos Restaurant Port', foodType: 'Mediterranean', price: 'High', rating: 4.4, description: 'A fine-dining restaurant that perfects Mediterranean dishes with elegance.' },
    {name: 'Orizontes Roof Garden', foodType: 'Greek', price: 'High', rating: 4.6, description: 'This restaurant offers quality food from across Europe, with occasional special weekends, where they serve food from a random european country.' },
    {name: 'SUSHIJA', foodType: 'Asian', price: 'High', rating: 4.5, description: ' A perfect place for those who love traditional and modern Japanese cuisine.' },
    {name: 'MAREA sea spirit', foodType: 'Sea Food', price: 'High', rating: 4.6, description: 'A fresh taste of the sea, the Mediterranean on your plate.' },
    {name: 'Odysseas Restaurant', foodType: 'Greek', price: 'Low', rating: 4.6, description: 'A cozy family restaurant to relax and take in Greek culture and food.' },
    {name: 'Giannoula', foodType: 'Greek', price: 'Low', rating: 4.7, description: 'A nice quiet restaurant that has a passion for Greek food.' },
    {name: 'IMERETI RESTAURANT', foodType: 'European', price: 'Low', rating: 4.6, description: 'Willing to try food from the farthest eastern point of Europe? IMERETI RESTAURANT specializes in Georgian food.' },
    {name: 'The Last Slice', foodType: 'Pizza', price: 'Low', rating: 4.7, description: 'Whether you sit down to eat our pizza or take it home, you will be back for a second one.' },
    {name: 'Falaifel', foodType: 'Middle-Eastern', price: 'Low', rating: 4.6, description: 'Craving Egyptian and middle-eastern food? Our restaurant offers food for your appetite.' },
    {name: 'Ballaro', foodType: 'Italian', price: 'High', rating: 4.2, description: 'Fine-dining, perfect for a warm summer night with gourmet spaghetti and a nice glass of wine.' },
    {name: 'The Greek', foodType: 'Greek', price: 'Medium', rating: 4.5, description: 'All things Greek, this is the place to be if you want all that Greece offers on a plate.' },
    {name: 'Holybox SKG', foodType: 'Fast Food', price: 'Low', rating: 4.7, description: 'A divine taste of fast food that will have you praying for more.' },
    {name: 'The Pasha House', foodType: 'Middle-Eastern', price: 'Medium', rating: 4.3, description: 'Craving something from our neighbors across the sea? Visit The Pasha House for a taste of delightful Turkish food.' },
    {name: 'NOSTOS Taverneio Tavern', foodType: 'Greek', price: 'Medium', rating: 4.6, description: 'A tavern with a friendly environment with good Greek food that will make you feel at home.' },
]

Restaurant.insertMany(seedRestaurants).then(res => {console.log(res)})
.catch(e => {console.log(e)})