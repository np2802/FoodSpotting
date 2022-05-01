const Resto = require('../models/restaurant');
const Comments = require('../models/comment');

const restaurant_seeds = [
    { 
        "title": "CHOPSTICKS", 
        "description": "Airoli", 
        "date": "2022-02-02", 
        "cuisine": "Chinese", 
        "otime": "03:02", 
        "ctime": "23:24", 
        "delivery": true,
        "fdish": "Burger", 
        "image_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZlf5lc5tX-0gY-y94pGS0mQdL-D0lCH2OQ&usqp=CAU" 
    },
    { 
        "title": "NEW", 
        "description": "Matunga West", 
        "date": "2021-01-01", 
        "cuisine": "Chinese", 
        "otime": "09:09",
         "ctime": "23:00", 
         "delivery": true,
          "fdish": "Bhindi", 
          "image_link": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" 
        },
    { 
        "title": "Joeys Pizza", 
        "description": "Matunga", 
        "date": "2011-11-11",
         "cuisine": "Indian", 
         "otime": "09:00", 
         "ctime": "23:00", 
         "delivery": false,
          "fdish": "Burger", 
          "image_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZlf5lc5tX-0gY-y94pGS0mQdL-D0lCH2OQ&usqp=CAU" 
        }
]

const seed = async () => {
    // Delete all the current restaurants and comments
    await Resto.deleteMany();
    console.log("Deleted All the Restaurants")

    await Comments.deleteMany();
    console.log("Deleted All the Comments!")

    //Create 3 new resto
    // for (const restaurant_seed of restaurant_seeds) {
    //     let restaurant = await Resto.create(restaurant_seed);
    //     console.log("Created a new Restauranrt:", restaurant.title)
    //     //Create new comment for each comic}
    //     await Comments.create({
    //         text: "Nice Restaurant",
    //         user: "Bob",
    //         restaurantId: restaurant._id
    //     })
    //     console.log("Created a new Comment!")
    // }
}

module.exports = seed;