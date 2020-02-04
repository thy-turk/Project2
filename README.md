# Project2

## What does this app do?
This app allows the user to search for recipes from which a user will get cooking information, health label, ingredients and more. A user could create an account and add those recipes to their profiles. Also there is a calories tracker and ingredient nutrition analyzer.

## About:
This app uses passport and bcrypt to create user account and encrypt their passwords. Passport with the help of cookies creates a persistant session so the user can navigate the page freely while remaining logged in. The landing page has a search bar that queries an API and returns each of the results dynamically. Each result is returned on a card that features information about the recipe as well as a save for later button and cooking instructions button. If a user is signed in the save for late button will save info to that user which will be displayed to the user on their profile page. This was done by creating get and post routes for the information to be saved and sent. There are some smaller features like the calorie tracker that keeps a running total of several nutrional labels for the user to track goals. This was done using a switch statement and by taking information from the database and adding it to the new user input, then updating the db again. 

## Try the app here:
https://frozen-fjord-19018.herokuapp.com/

## Tools Used:
* Passport
* Tailwind
* Sequelize
* Node
* Express
* MySQL
* javascript
* Handlebars
* npm
* jquery
* Heroku

## Contributors
* Nathanael S - front end, integration, and git conflict resolution
* Tucker F - user authentication, API calls, and routes
* Mike S - API calls, database setup, and presentation


