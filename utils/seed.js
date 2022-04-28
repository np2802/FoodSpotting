const Resto = require("../models/restaurant");
const Comment = require("../models/comment");
const res = require("express/lib/response");

const restaurant_seeds = [
  {
    title: "MDH",
    description: "Thane",
    date: "2022-04-23",
    cuisine: "Indian",
    otime: "07:45",
    ctime: "20:00",
    delivery: true,
    fdish: "Burger",
    image_link:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhY...",
    __v: 0,
  },
  {
    title: "Joeys Pizza",
    description: "Matunga",
    date: "2022-04-26",
    cuisine: "Indian",
    otime: "09:00",
    ctime: "23:00",
    delivery: true,
    fdish: "Pizza",
    image_link: "",
    __v: 0,
  },
];

const seed = async () => {
  await Resto.deleteMany();
  console.log("All restaurants deleted");

  await Comment.deleteMany();
  console.log("All comments deleted");

  for (const restaurant_seed of restaurant_seeds) {
    let restaurant = await Resto.create(restaurant_seed);
    console.log("Create a new restaurant :", restaurant.title);
    await Comment.create({
      text: "I love this restaurant ",
      user: "User1",
      restaurantId: restaurant._id,
    });
    console.log("Create a new comment");
  }
};

module.exports = seed;
