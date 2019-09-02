const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const path = require('path');

//listen to port 3000 by default
var port = process.env.PORT || 3000;

app.use(compression());
app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
})

app.get('/version', function (req, res) {
    var version = require(path.join(__dirname, 'version.json'));
    return res.status(200).send(version);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;