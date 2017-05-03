var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 9001;

app.use('/assets', express.static('assets'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT);
console.log('Server running on port ' + PORT);