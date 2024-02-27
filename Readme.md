# SwipTory

SwipTory is a web application that allows users to explore stories shared by others. It provides a swipeable interface for seamless story navigation and offers advanced features like story bookmarking and user-driven story updates, enhancing user engagement and personalization.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

SwipTory is an innovative web application that brings storytelling to life. Built with a robust backend using Node.js and Express, and utilizing MongoDB for efficient data storage, SwipTory offers users a seamless experience of exploring and interacting with stories. The frontend, developed using React, provides an intuitive and responsive interface, prioritizing user experience.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: React

## Features

- **Swipeable Interface**: Navigate through stories effortlessly with a swipeable interface.
- **Story Bookmarking**: Save your favorite stories for quick access later.

- **User-Driven Story Updates**: Engage with stories by providing feedback and updates, ensuring personalized content.

- **Intuitive User Interface**: Designed with user experience in mind, SwipTory offers an intuitive and user-friendly interface for seamless interaction.

## Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/abhishekbadole8/SwipTory_Be.git)

2. Install dependencies:

cd swiptory
npm install

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

PORT=5000
MONGODB_URI=<your-mongodb-uri>
SECRET = <your-jwt-secret>

Replace `<your-mongodb-uri>` with your MongoDB connection URI.

4. Start the server:

npm run dev

5. Start the frontend:

cd client
npm start

## Usage

To use SwipTory, simply navigate to the deployed application and start exploring stories. Use the swipeable interface to navigate through stories, bookmark your favorite ones, and engage with user-driven updates for personalized content.
