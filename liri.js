// COMMANDS
    // my-tweets
    // spotify-this-song
    // movie-this
    // do-what-it-says

// DESIGN\
require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

var cmdInput = process.argv[2];


getInput(cmdInput);

function getInput(cmdInput, args) {
    if (logged()) {
        switch (cmdInput) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            if (args) {
                console.log(' Argument passed: ' + args);
                spotifySong(args);
            }
            else {
                if (process.argv[3] != null) {
                    var song = process.argv.slice(3).join('+');
                    spotifySong(song);
                }
                else {
                    spotifySong('I Like It');
                }
            }
            break;
        case 'movie-this':
            if (args) {
                myMovieDetails(args);
            }
            else {
                var movie = process.argv.slice(3).join('+');
                myMovieDetails(movie);
            }
            break;
        case 'do-what-it-says':
            runCommand();
            break;
        }
    }
}

// all of the code for my-tweets goes here
function myTweets() {
    var client = new Twitter(keys.twitterKeys);
    var params = {
        screen_name: 'jagertooth',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log('');
                console.log('_______________________________________________________');
                console.log(' Tweet: ' + tweets[i].text);
                console.log('');
                console.log(" Tweet Number: " + (i + 1));
                console.log('');
                console.log(' Created: ' + tweets[i].created_at);
                console.log('_______________________________________________________');
                console.log('');
            }
        }
    });
}

// all of the spotify code will go here
function spotifySong() {
    spotify.search({
        type: 'track',
        query: 'song'
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        return;
    }
        else {
                console.log('');
                console.log('_______________________________________________________');
                console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
                console.log('Song Name: ' + data.tracks.items[0].name);
                console.log('Album Name: ' + data.tracks.items[0].album.name);
                console.log('Preview URL: ' + data.tracks.items[0].preview_url);
                console.log('_______________________________________________________');
                console.log('');
        }
    });
}

// all of the movie-this code goes here
function myMovieDetails(movie) {
    var query = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&r=json&tomatoes=true';
    request(query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieDetails = JSON.parse(body);
            // if no movie entered use below movieDetails for movie
            if (movieDetails.Response === 'False') {
                myMovieDetails('Super Troopers');
            }
            else {
                // sends data to console
                console.log('');
                console.log('_______________________________________________________');
                console.log(" Title: " + JSON.parse(body).title);
                console.log(" Release Year: " + JSON.parse(body).released);
                console.log(" Actors: " + JSON.parse(body).actors);
                console.log(" IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log(" Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                console.log(" Country: " + JSON.parse(body).country);
                console.log(" Language: " + JSON.parse(body).language);
                console.log(" Plot: " + JSON.parse(body).plot);
                console.log('_______________________________________________________');
                console.log('');
            }
        }
    });
}

function runCommand() {
    fs.readFile('random.txt', 'utf-8', function (error, data) {
        var fileCommands = data.split(',');
        getInput(fileCommands[0], fileCommands[1]);
    });
}

function logged() {
    // captures all command line inputs
    var inputs = process.argv.slice(2).join(" ");
    // feeeds the  data to the log file
    // console.log(inputs);
    // appends data to the log file after each run
    fs.appendFile("log.txt", "node liri.js: " + inputs + "\n", function (error) {
        if (error) {
            throw error;
        }
        else {
            console.log(" Updated log! ");
        }
    });
    return true;
}
