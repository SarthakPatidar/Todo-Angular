const express = require('express');
var path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/angular-app-valuefy'));
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/dist/angular-app-valuefy/index.html'));
})


app.listen(process.env.PORT || 8080);