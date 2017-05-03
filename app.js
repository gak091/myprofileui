var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 9001;

app.use('/assets', express.static('assets'))
app.use('/image-store', express.static('image-store'))
// viewed at http://localhost:8080


app.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/myprofilebot', function(req, res) {
    res.sendFile(path.join(__dirname + '/profilebot.html'));
});

app.listen(PORT);
console.log('Server running on port ' + PORT);