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
app.use(express.static('fonts'));
app.locals.pretty = true;



/* Study의 게시글 보여주기 */
app.get('/menu/study/:field/:subject/:id', (req, res)=>{
    let topic = req.params.topic;
    let field = req.params.field;
    let subject = req.params.subject;
    let id = req.params.id;
    let path = `menu/study/${field}/${subject}/${id}`;
    fs.readFile(path, "utf8", (err, data)=>{
        if (err){console.log(err);res.send(err);}
        fs.stat(path, (err, stats)=>{
            if (err){console.log(err);res.send(err);}
            let mtime = stats.mtime;
        
            let year = mtime.getFullYear();
            let month = mtime.getMonth() + 1;
            let date = mtime.getDate();
            let Day = {0:"Sun", 1:"Mon", 2:"Tue", 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sun'};
            let day = Day[mtime.getDay()];

            let time = `${year}-${month}-${date} (${day})`;

            res.render('main', {title:id, description:data, time:time});
        });
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

/* Rest의 게시글 보여주기 */
app.get('/menu/rest/:field/:id', (req,res)=>{
    let field = req.params.field;
    let id = req.params.id;
    let path = `menu/rest/${field}/${id}`;

    fs.readFile(path, "utf8", (err, data)=>{
        if(err){console.log(err); res.send(err);}

        fs.stat(path, (err, stats)=>{
            if (err){console.log(err);res.send(err);}
            let mtime = stats.mtime;
        
            let year = mtime.getFullYear();
            let month = mtime.getMonth() + 1;
            let date = mtime.getDate();
            let Day = {0:"Sun", 1:"Mon", 2:"Tue", 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sun'};
            let day = Day[mtime.getDay()];

            let time = `${year}-${month}-${date} (${day})`;

            res.render('main', {title:id, description:data, time:time});
        });
    });
});

/* Rest의 세부항목들 보여주기 */
app.get('/menu/rest/:field', (req, res)=>{
    let field = req.params.field;
    let path = `menu/rest/${field}`;
    fs.readdir(path, (err, files)=>{
        if(err){console.log(err);res.send(err);}
        res.render('main',{title:field, description:files});
    });
});

/* 메뉴화면 */
app.get('/menu/:topic/:field', (req, res)=>{
    let topic = req.params.topic;
    let title = req.params.field;
    let path = `menu/${topic}/${title}/`
    fs.readdir(path, function(err, files){
        if (err){console.log(err);res.send(err);}
        let description = files;
        res.render('main', {title:title, description:description});
    });
});

/* 드라이브 구성 */
app.get('/drive', (req, res)=>{

    res.render('main', {title:'drive', description: 'my chest'});

});

/* 나의 포트폴리오 보여주기 */
app.get('/inf', (req, res)=>{

    res.render('main', {title:'MY Information', description:'blur blurblur'});

});

/*글쓰기*/
app.get('/write', (req, res)=>{
    res.render('main', {title:'Title.', description:"Cont."});
});

/*글쓰기 후 전송*/
app.post('/write', (req, res)=>{
    let title = req.body.title;
    let description = req.body.description;
    console.log(title, description);
    let url = `menu/${req.body.topic}/${req.body.field}/${req.body.subject}/${title}`;
    fs.writeFile(url, description, function(err){
        if (err){console.log(err);res.send(err);}
        res.render('main',{title:title, description:description});
    });
});

/* 로그인 */
app.get('/login', (req, res) =>{
    res.render('main', {title:'login', description:'description'});
});

/*메인화면*/
app.get('/', (req, res)=>{res.render('main', {title:"다양한 블로그 PAT Head", description :"여기는 메인 화면입니다."});});

/* 서버를 3000포트로 열고 callback함수 실행 */
app.listen(3000, () => {

    console.log('Server open port : 3000');
    
});