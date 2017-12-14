# Quantified Self API

This is the API for the quantified self project that can be found at `https://github.com/erose357/quantified-self`

# Endpoints

This API supports the following endpoints:

Food Endpoints:

* GET /api/v1/foods - returns all foods currently in the database

* GET /api/v1/foods/:id - returns the food object with the specific :id you've passed in or 404 if the food is not found

* POST /api/v1/foods - allows creating a new food with the parameters:
{ food: { name: "Name of food here", calories: "Calories here"} }
If food is successfully created, the food item will be returned. If the food is not successfully created, a 400 status code will be returned. Both name and calories are required fields.

* PATCH /api/v1/foods/:id - allows one to update an existing food with the parameters:
{ food: { name: "Name of food here", calories: "Calories here"} }
If food is successfully updated (name and calories are required fields), the food item will be returned. If the food is not successfully updated, a 400 status code will be returned.

* DELETE /api/v1/foods/:id - will delete the food with the id passed in. If the food can't be found, a 404 will be returned.

Meal Endpoints

* GET /api/v1/meals - returns all the meals in the database along with their associated foods

* GET /api/v1/meals/:meal_id/foods - returns all the foods associated with the meal with an id specified by :meal_id or a 404 if the meal is not found

* POST /api/v1/meals/:meal_id/foods/:id - adds the food with :id to the meal with :meal_id
This creates a new record in the MealFoods table to establish the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.

* DELETE /api/v1/meals/:meal_id/foods/:id - removes the food with :id from the meal with :meal_id
This deletes the existing record in the MealFoods table that creates the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.


## Setup

The site is hosted on heroku and can be found at `https://qs-node-api.herokuapp.com/`


You can clone the repo by following these steps:

``` shell
git clone git@github.com:blsrofe/qs_node_api.git
cd quantified-self
npm install
```

You can run the program by entering
```shell
npm start
```
## Contributions

To contribute to this app fork and download then submit a PR to this repository.

## Collaborators

Eddie Rose - @erose357
Becki Srofe - @blsrofe
