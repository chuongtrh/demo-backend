const express = require('express');
const app = express();

//listen to port 3000 by default
var port = process.env.PORT || 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;