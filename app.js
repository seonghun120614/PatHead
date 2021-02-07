const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
var router = require('./routes')(app, Book);


module.exports = () =>{
    const connect = async () =>{
        if(process.env.NODE_ENV !== 'production') mongoose.set('debug', true);

        
        try {
            await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@phdb.wisly.mongodb.net/phdb?retryWrites=true&w=majority`, {
                dbName: 'nodejs',
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log('The server is conneted');
        } catch(error){
            console.error(error);
        }
    };
    
    connect();

    mongoose.connection.on('error', (error)=>{
        console.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', ()=>{
        console.error('몽고디비 연결 끊김, 연결 재시도');
        connect();
    });
}

var Book = require('./models/book');


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.locals.pretty = true;



app.get('/', function(req, res){
    res.render('main', {title:"다양한 블로그 PAT Head", description :"여기는 메인 화면입니다."});
});

app.get('/write', function(req, res){
    res.render('main', {title:'Title.', description:"Cont."})
});
app.post('/write', function(req, res){
    if (entry){
        let title = req.body.title;
        let description = req.body.description;
        let url = `menu/${req.params.topic}/${req.params.field}/${req.params.index}/${req.params.id}/`;
        fs.writeFile(url+title, description, function(err){
            if(err){
                res.status(500).send('Interval server error');
            }
            res.redirect(url+title);
        });
    } else {
        res.send('허가되지 않았습니다.');
    }
});
app.get('/menu/:topic/:field/:id',function(req, res){
    let path = 'menu/'+req.params.topic+'/'+req.params.field+'/'+req.params.id;
    if (req.params.topic == "study"){
        fs.readdir(path + '/', function(err, files){
            if(err){
                console.log(err);
                res.send('err');
            }
            let title = req.params.id;
            let description = files;
            res.render('main', {title:title, description:description, topic:req.params.topic});
        });
    } else {
        fs.readFile(path, {encoding:'utf-8'}, function(err, data){
            if(err){
                console.log(err);
                res.send('err');
            }
            let title = req.params.id;
            let description = data;
            res.render(title, description);
        })
    }
})
app.get('/menu/:topic/:field', function(req, res){
    let title = req.params.field;
    fs.readdir('menu/'+req.params.topic+'/'+title+'/', function(err, files){
        if(err){
            console.log(err);
            res.send('err');
        }
        let description = files;
        res.render('main', {title:title, description:description, topic:req.params.topic});
    });
});

app.get('/drive', function(req, res){
    res.render('main', {title:'drive', description: 'my chest'});
});

app.get('/inf', function(req, res){
    res.render('main', {title:'MY Information', description:'blur blurblur'});
});

app.listen(3000, () => {
    console.log('Server open port : 3000');
});