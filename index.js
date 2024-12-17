require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));
let d = new Date().toUTCString();
app.use((req, res, done) =>{
  console.log(`${req.method}    ${req.path} - ${req.ip} at ${d}`);
  done();
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  let ip = req.ip;
  let language = req.headers["accept-language"];
  let softWare = req.headers["user-agent"];
  res.json({"ipaddress": ip, 
            "language": language,
            "software": softWare
          });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log(`Go to http://localhost:${listener.address().port}/`)
});
