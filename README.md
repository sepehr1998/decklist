# Getting Started with Deck List App
## Table of Contents
1. [Introduction](#Introduction)
2. [Ways to Improve](#ways-to-improve)
3. [Available Scripts](#available-scripts)

## Introduction

### Functionality
For UI components, Material UI library is used in this project.

This application uses the Ringsdb API to fetch a list of heroes by querying a Deck ID.

If the fetch is unsuccessful, a custom built alert will popup with a description of the error. 

If the fetch is successful, you will see a table with the list of heroes and some of their properties.

In the header of the screen, you can see the deck name, a search bar to query another deck and two buttons to switch between
list view and grid view.

In the list view, at the end of each row of the table, there is an `Info` button. If you click that, a new modal will be
opened with more information of the hero and the picture of the hero card.

In the grid view, the list of heroes is visualized in a card way. You can click on the cards to open the modal and see the same information.

### Structure

App.tsx is the main file that is imported in the index.js.

In the App.tsx, if it's the initial render and there is no hero data available, only a search bar will be visible in the middle of the screen.

If hero data is available, HeroList component will be rendered. In this component, we have two views. 

In list view, a table will be rendered to show all the information and a button at the end of the row for more information.

In the grid view, a number of cards will be rendered. The card component is developed separately as an external component.

For visualizing more information about the heroes, a modal is used. We have a separate component for that, too.

In case of any errors while fetching the deck or heroes, a custom alert component is developed to show it in a more user-friendly way.

## Ways to improve

There are a couple of limitations based on the structure of the API and available tools.

1. For example, it can be a good idea to have a list of decks and suggest them to the users when they are trying to search a deck.
It can be done using a dropdown menu or just suggestions in the text field. But it needs access to the APIs with oauth2 access. It's not implementable with the public APIs.
2. After fetching the deck by deck ID, the API returns an array of heroes that only contains the ID of those heroes. Only showing that to the user is not user-friendly at all. So, we need to access at list the name of the hero. To do that, I had to query all those heroes automatically after the fetch deck is successful. It adds a network load to the project. So, it can be improved by adding the basic information of the hero to the deck API. In this way, if the users need more information, they can click on the Info button and now, the app will only fetch the information of that specific hero. It reduces the number of network requests significantly.  

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
If you have a service running on this port, it will ask you to confirm the port change.

### `npm test`

Launches the test runner in the interactive watch mode.\
Also, if you want to check the coverage of tests, you can use the following command. The normal command without the last flag won't work as it's still not fixed for React 18 and above

`npm test -- --env=jsdom --coverage --watchAll=false`
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
