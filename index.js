const express = require('express');
const fs = require('fs');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.locals.pretty = true;

app.get('/', function(req, res){
    res.render('main', {title:"다양한 블로그 PAT Head", description :"여기는 메인 화면입니다."});
});

app.listen(3000, () => {
    console.log('Server open port : 3000');
});