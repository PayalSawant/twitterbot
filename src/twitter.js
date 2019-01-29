const express = require('express');
const request = require('request');
const path = require('path');


// create express server
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/tweets', function(req, res) {

    function getData() {
       return new Promise(function (resolve, reject) {
         const options = {
           url: 'https://api.twitter.com/1.1/followers/ids.json?screen_name=viren140290',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAPA19QAAAAAAv78Iki4ZmcTSHYoQ0vJQxFw%2FmH8%3DgPJwKWLmY5qDkeooaT3yNPepbdTkDpAJZ3mJiMKkw9Jn6K63wo'
           }
         };

         request(options, function(error, response, body){
             if (!error && response.statusCode == 200) {
               const info = JSON.parse(body);
               testTweets = info.ids
               resolve(info.ids);
             }
         });

       });
    }

    getData().then(function(val){
      testPrint(val)
    }).catch(function(error) { console.log(error) })

      function testPrint(testTweets){
        console.log(testTweets)
         res.render('index', { tweets: testTweets });
      }


    //  console.log(testTweets)
});

// listen to port 3000
app.listen(3000, () => {
  console.log('app listening on http://localhost:3000');
});
