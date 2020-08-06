var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var cons = require('consolidate');
var dust = require('dustjs-helpers');
var pg = require('pg');
const bodyParser = require('body-parser');
var app = express();

//database string
var connect = 'postgresql://learn:demo@localhost/sforkDB';

//Assign dust engine to .dust files
app.engine('dust', cons.dust);

//Set Dust as default Ext
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route
app.get('/', function (req, res) {
  //PG connect
  pg.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream('SELECT * FROM recipes', [1000000]);
    const stream = client.query(query);
    //release the client when the stream is finished
    stream.on('end', done);
    stream.pipe(JSONStream.stringify()).pipe(process.stdout);
  });
});

//Server
app.listen(3000, function () {
  console.log('Server started on Port 3000');
});
