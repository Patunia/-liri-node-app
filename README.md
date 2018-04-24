# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get your latest tweets, find out about a song, or a movie, or just choose a random action from your own random file.

## Install

The package.json lists dependent node packages, and these are the ones to install.

### Twitter

npm install twitter

### Spotify

npm install spotify

### Request

npm install request

### FS

npm install fs

### Simple Node Logger

npm install simple-node-logger

## Get Started

### Get Tweets

Command to run LIRI:

node liri.js my-tweets

Retrieves up to your latest 20 tweets!

### Get Song Info

Command to run LIRI:

node liri.js spotify-this-song "type your song name here without quotes"

Retrieves song information:

* Artist
* Song's name
* Spotify link
* Album name

If no song is entered, the default is "I like It" by Cardi B

### Get Movie Info

Command to run LIRI:

node liri.js movie-this "type your movie name here without quotes"

Retrieves movie information:

* Title
* Year
* IMDB Rating
* Rotten Tomatoes Rating
* Country
* Language
* Plot
* Cast

If no movie is entered, the default is "Super Troopers"

### Get Random Info

Command to run LIRI:

node liri.js do-what-it-says

Retrieves random text inside a file and does what the file says.

### Extra Special Log Feature

Append to log.txt to save your information!

## Tech used

* Node.js - <https://nodejs.org/en/>
* Twitter NPM Package - <https://www.npmjs.com/package/twitter>
* Spotify NPM Package - <https://www.npmjs.com/package/spotify>
* Request NPM Package - <https://www.npmjs.com/package/request>
* DotEnv NPM Package - <https://www.npmjs.com/package/dotenv>

## Prerequisite

Node.js -  <https://nodejs.org/en/>

## Author

Patricia Joanna Borowiec