var express = require('express');
var app = express();
var cors = require('cors');


app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));


app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// the first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

//get time in unix format
app.get("/api/:date?", (req, res) => {
  let date
  if (!req.params.date) {
    date = Date.now();
    res.json({ unix: date, utc: new Date().toUTCString() })
    return
  } else if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date))
  }
  else {
    date = new Date(req.params.date)
  }

  if (isNaN(date)) {
    res.json({ error: "Invalid Date" })

  } else {
    let dateUtc = date.toUTCString()
    res.json({ unix: Math.floor(date.getTime()), utc: dateUtc })
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
