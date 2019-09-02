const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');

//listen to port 3000 by default
var port = process.env.PORT || 3000;

app.use(compression());
app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
})

app.get('/hi', function (req, res) {
    res.send('say hi');
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;