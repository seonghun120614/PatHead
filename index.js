const express = require('express');
const fs = require('fs');
var app = express();
const multer = require('multer');
var _storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'data/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({storage : _storage});

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('main', {title:"다양한 블로그 PAT Head", description :"여기는 메인 화면입니다."});
});

app.get('/write', function(req, res) {
    
})

app.listen(3000, () => {
    console.log('Server open port : 3000');
});