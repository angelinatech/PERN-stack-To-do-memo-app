# `<PERN-stack-Todo-app>`

## Description

A cute and aesthetic todo application built using PostgreSQL, Express, React, and NodeJS. Sign up/Log in and create your own personal To do list, organised by date and category.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To use on your own system, clone this repository, open in your own CLI, remember to install all of the dependencies by running npm i in the correct folders, and create your own .env files with the following information:

REACT_APP_SERVERURL (your chosen server)

USERNAME (postgreSQL database)

PASSWORD (postgreSQL database)

HOST (postgreSQL database)

DBPORT (postgreSQL database)

JWT_SECRET (your chosen JSON web token secret)

(before any kind of deployment remember to add your .env to your .gitignore file!)

Following this, you will be able to open it by running 'npm run start' and opening it it your web browser

## Usage

When a user opens the application the log in/sign in modal will be displayed.

If the user has an account already they will be able to enter their username and password to securely log in. There will be an error message displayed if the account is not found.

If the user does not yet have an account they will be able to select the sign up option where they can choose a username, and be prompted to enter their email twice as well as choose a password. The emails must match or the signup will not work. The emails are currently not checked in an way so you can just use a dummy email with the correct syntax and it will work. If builing your own project you may want to consider adding further verification functionality.

Once the user has logged in or signed up, they will see their home screen where they will be able to add or edit their own to do lists.

To add a memo, click the 'ADD NEW' button. A modal will appear prompting the user to enter their memo title, an option to select a category, which will determine the background image of their memo, and an option to show their progress on that task with a slider input. On pressing the button to submit the memo will appear on their home page.

The user will be able to edit their memo and change their progress level by clicking the 'EDIT' button on their memo and changing their inputs.

The user will be able to delete the memos they no longer need by clicking the 'DELETE' button.

The user will also be able to log out via the 'LOGOUT' button, or the auth automatically times out after 1hr.

This is a sample image of the working application's functionality:

![Screenshot 2023-05-19 at 16 01 25](https://github.com/angelinatech/PERN-stack-Todo-app/assets/130837613/facf8e0d-0f49-46ad-a807-5f7b6adb1f16)

## Credits

[node.js](https://nodejs.org/en/download) for the creation of the application

[PostgreSQL](https://www.postgresql.org/download/) for the database.

[Thunder Studios&#39;](https://befonts.com/ade-display-font.html) typeface for the Ade Display Font.

[rc-slider]() for one of the slider components.

[dotenv](https://www.npmjs.com/package/dotenv): to store all my most precious secrets.

[express](https://expressjs.com/): for routers and server-side logic.

[bcrypt](https://www.npmjs.com/package/bcrypt): to securely hash passwords.

[cors](https://www.npmjs.com/package/cors): to avoid CORS error messages, handle Cross-Origin Resource Sharing (CORS)

[express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for rate limiting, protect against brute-force attacks or excessive requests

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): to create JWT for authorisation and log in etc.

[nodemon](https://www.npmjs.com/package/nodemon): to listen for changes to js file (start with nodemon server.js in package.json). Used during dev.

[pg](https://www.npmjs.com/package/pg): to work with PostgreSQL database (driver for Node.js).

[react-cookie](https://www.npmjs.com/package/react-cookie): for cookies.

[uuid](https://www.npmjs.com/package/uuid): for generating random unique identifiers.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The license will be MIT open source, please see documentation for further details.
https://opensource.org/license/mit/

## How to Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

This project will use the open source [contributer covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) so feel free to add/message as you see fit.

## Tests

Not yet, future task.
