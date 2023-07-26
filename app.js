const express = require("express");
const cors = require("cors");
const pizzaDATA = require("./pizzaData/pizzaData.json");
const app = express();
app.use(cors());

app.get("/", (request, response) => {
  response.status(200).json({ data: "service is running" });
});

//  /items	GET	returns an array of all the menu items
// /items/:id

app.get("/items", (request, response) => {
  try {
    const pizzas = pizzaDATA;
    response.status(200).json({ data: pizzas });
  } catch (err) {
    response.status(500).json({ data: err.message });
  }
});

app.get("/items/:id", (request, response) => {
  try {
    const { id } = request.params;
    const pizzas = pizzaDATA;
    const pizza = pizzas.find((pizza) => pizza.id === id);
    if (pizza) {
      response.status(200).json({ data: pizza });
    } else {
      response
        .status(404)
        .json({ error: `Menu item with ID: ${id} does not exist.` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = app;
