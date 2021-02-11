const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

/*
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
*/


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.locals.pretty = true;


/*메인화면 오류 x*/
app.get('/', function(req, res){

    res.render('main', {title:"다양한 블로그 PAT Head", description :"여기는 메인 화면입니다."});

});


/*글쓰기*/
app.get('/write', function(req, res){

    res.render('main', {title:'Title.', description:"Cont."});

});

/*글쓰기 후 전송*/
app.post('/write', function(req, res){

    if (entry){

        let title = req.body.title;

        let description = req.body.description;

        let url = `menu/${req.params.topic}/${req.params.field}/${req.params.index}/${req.params.id}/`;

        fs.writeFile(url+title, description, function(err){

            errChk(err);

            res.redirect(url+title);

        });

    } else {

        res.send('허가되지 않았습니다.');

    }

});


/* 메뉴화면 */
app.get('/menu/:topic/:field', function(req, res){
    let topic = req.params.topic;
    let title = req.params.field;
    let path = `menu/${topic}/${title}/`

    fs.readdir(path, function(err, files){
        if (err){console.log(err);res.send(err);}
        let description = files;
        res.render('main', {title:title, description:description});
    });

});

/* Study의 세부 과목들 보여주기 */
app.get('/menu/study/:field/:subject', (req, res)=>{
    let field = req.params.field;
    let subject = req.params.subject;
    
    let path = `menu/study/${field}/${subject}`;
    fs.readdir(path, (err, files)=>{
        if (err){console.log(err); res.send(err);}
        let description = files;
        res.render('main',{title:subject, description:description});
    });
});

/* Rest의 세부 항목들 보여주기 */
app.get('/menu/rest/:field', (req, res)=>{
    let field = req.params.field;
    let path = `menu/rest/${field}`
    fs.readFile(url, (err, data)=>{
        if(err){console.log(err);res.send(err);}
        let description = data;
        res.render('main',{title:subject, description:description});
    });
});

/* Study의 게시글 보여주기 */
app.get('/menu/study/:field/:subject/:id', (req, res)=>{
    let topic = req.params.topic;
    let field = req.params.field;
    let subject = req.params.subject;
    let id = req.params.id;

    let path = `menu/study/${field}/${subject}/${id}`
    fs.readFile(path, "utf8", (err, data)=>{
        if (err){console.log(err);res.send(err);}

        fs.stat(path, (err, stats)=>{
            if (err){console.log(err);res.send(err);}

            let mtime = stats.mtime;
            
            let year = mtime.getFullYear();
            let month = mtime.getMonth() + 1;
            let date = mtime.getDate();

            let hour = mtime.getHours();
            let min = mtime.getMinutes();
            let sec = mtime.getSeconds();

            let Day = {0:"Sun", 1:"Mon", 2:"Tue", 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sun'};
            let day = Day[mtime.getDay()];

            let time = `${year}-${month}-${date} ${hour}:${min}:${sec} (${day})`;

            res.render('main', {title:id, description:data, time:time});
        });
    });
});

/* Rest의 게시글 보여주기 */
app.get('/menu/rest/:field/:id', (req,res)=>{
    let field = req.params.field;
    let id = req.params.id;
    let path = `menu/rest/${field}/${id}`;

    fs.readFile(path, (err, data)=>{
        if(err){console.log(err); res.send(err);}

        fs.stat(path, (err, stats)=>{
            if (err){console.log(err);res.send(err);}

            let mtime = stats.mtime;
            res.render('main', {title:id, description:data, time:mtime});
        });
    });
});

/* 드라이브 구성 */
app.get('/drive', function(req, res){

    res.render('main', {title:'drive', description: 'my chest'});

});

/* 나의 포트폴리오 보여주기 */
app.get('/inf', function(req, res){

    res.render('main', {title:'MY Information', description:'blur blurblur'});

});

/* 서버를 3000포트로 열고 callback함수 실행 */
app.listen(3000, () => {

    console.log('Server open port : 3000');
    
});