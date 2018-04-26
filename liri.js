// COMMANDS
    // my-tweets
    // spotify-this-song
    // movie-this
    // do-what-it-says

require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require("spotify");

var request = require("request");
var fs = require('fs');

var yourWords = process.argv[2];
//var userSong = process.argv[3];
//getInput(yourWords);

// function logResults(result){
// 	fs.appendFile('./log.txt', result, function (err) {
// 	  if (err) throw err;
// 	});
// }

// function getInput(yourWords, args) {
    if (logged()) {
    switch (yourWords) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            //if (args) {
            //     console.log(' Argument passed: ' + args);
            //     spotifyThis(args);
            // }
            // else {
            //     if (process.argv[3] != null) {
            //         var song = process.argv.slice(3).join('+');
            spotifyThis();
            //     }
            //     else {
            //         spotifyThis('I Like It');
            //     }
            // }
            break;
        case 'movie-this':
            // if (args) {
            //     movieThis(args);
            // }
            // else {
            //     var movie = process.argv.slice(3).join('+');
            movieThis();
            //}
            break;
        case 'do-what-it-says':
            rando();
            break;
        default:
            console.log("\r\n" +"OOPSIES... Please use one of the following commands: " +"\r\n"+
			"  node liri.js my-tweets " +"\r\n"+
			"  node liri.js spotify-this-song 'song title' "+"\r\n"+
			"  node liri.js movie-this 'movie title' "+"\r\n"+
			"  node liri.js do-what-it-says"+"\r\n"+
			"Pro tip: use QUOTES when a song or movie is multiple words!");
        }
    //}
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

// spotify
function spotifyThis() {
    spotify.search({
        type: 'track',
        query: ""
    }, function (err, data) {
        if (err) {
        console.log('Error: ' + err);
        return;
    }
        else {
            console.log('');
            console.log('_______________________________________________________');
            console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Album Name: ' + data.tracks.items[0].album.name);
            console.log('Check it out: ' + data.tracks.items[0].preview_url);
            console.log('_______________________________________________________');
            console.log('');

            // logResults('');
            // logResults('_______________________________________________________');
            // logResults('Artist: ' + data.tracks.items[0].album.artists[0].name);
            // logResults('Song Name: ' + data.tracks.items[0].name);
            // logResults('Album Name: ' + data.tracks.items[0].album.name);
            // logResults('Check it out: ' + data.tracks.items[0].preview_url);
            // logResults('_______________________________________________________');
            // logResults('');
        }
    });
}

// movie-this
function movieThis() {
        var movie = process.argv[3];
		if(!movie){
			movie = "Super Troopers";
		}
        params = movie;
		//request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        var query = 'http://www.omdbapi.com/?t=' + "params" + '&plot=short&r=json&tomatoes=true';
        request(query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // if no movie entered use below movieDetails for movie
            // if (movieDetails.Response === 'False') {
            //     movieThis('Super Troopers');
            // }
            //else {
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
                // logged(" Plot: " + JSON.parse(body).plot);
                // logged('_______________________________________________________');
                // logged('');
                // logged('');
                // logged('_______________________________________________________');
                // logged(" Title: " + JSON.parse(body).title);
                // logged(" Release Year: " + JSON.parse(body).released);
                // logged(" Actors: " + JSON.parse(body).actors);
                // logged(" IMDB Rating: " + JSON.parse(body).imdbRating);
                // logged(" Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                // logged(" Country: " + JSON.parse(body).country);
                // logged(" Language: " + JSON.parse(body).language);
                // logged(" Plot: " + JSON.parse(body).plot);
                // logged('_______________________________________________________');
                // logged('');
        } else {
				console.log('Error: ' + error);
				return;
			}
        // }
   });
}

function rando() {
    fs.readFile('random.txt', 'utf-8', function (error, data) {
        if (!error) {
            randoResults = data.split(",");
            spotifyThisSong(randoResults[0], randoResults[1]);
        } else {
            console.log("Error: " + error);
        }var fileCommands = data.split(',');
        //getInput(fileCommands[0], fileCommands[1]);
    });
}

function logged() {
    // captures all command line inputs
    var inputs = process.argv.slice(2).join(" ");
    // feeds the  data to the log file
    console.log(inputs);
    // appends data to the log file after each run
    fs.appendFile("log.txt", "node liri.js: " + inputs + "\n", function (error) {
        if (error) {
            throw error;
        }
        else {
            console.log(" Updated log! ");
        }
    });
    // return true;
}
