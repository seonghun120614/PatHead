const express = require('express');
const fs = require('fs');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

require('dotenv').config();
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

/* 
rendering 주요 요소

title : 글 제목
description : 글 내용
name : 로그인하면 name 표시
time : 글을 읽을때 글이 만들어진 날짜
status : 글고치기(update), 글추가 할때 필요
title_ : 글고칠때 표시되는 제목 (수정못함)
description_ : 글고칠때 글 내용 (수정가능)
path : 글고칠때 해당 path (수정못함)
*/

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static('fonts'));

app.use(session({  // 2
  secret: 'Lnmin',  // 암호화
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.locals.pretty = true;

/* Update */
app.get('/menu/study/:field/:subject/:id/update', (req, res)=>{
    let field = req.params.field;
    let subject = req.params.subject;
    let id = req.params.id;
    let path = `menu/study/${field}/${subject}/${id}`;

    let name = () =>{
        if (req.session.logined) {
            return req.session.user;
        }else{
            return false;
        }
    }
    
    fs.readFile(path, 'utf8', (err, data)=>{
        if(err){throw err;}
        res.render('main',{
            title: 'Title.',
            description:'Cont.',
            title_: id,
            description_: data,
            name : name,
        });
    });
});

app.get('/menu/rest/:field/:subject/update', (req, res)=>{
    let field = req.params.field;
    let subject = req.params.subject;

    let path = `menu/rest${field}/${subject}`;

    fs.readFile(path, (err, data)=>{
        if(err){throw err}

        let name = () =>{
            if (req.session.logined) {
                return req.session.user;
            }else{
                return false;
            }
        }

        res.render('main', {
            title : 'Title.',
            description: 'Cont.',
            title_ : id,
            description_ : data,
            path : `study/${field}/${subject}`,
            status : 'update',
            name : name
        });
    });
});

/* Remove */

app.get('/menu/study/:field/:subject/:id/remove', (req, res)=>{
    let field = req.params.field;
    let subject = req.params.subject;
    let id = req.params.id;
    let path = `menu/study/${field}/${subject}/${id}`;
    fs.unlink(path, (err) => {
        if (err) throw err;
        console.log(path+' was deleted');
        res.redirect(url.resolve('/menu/study/',`${field}/${subject}`));
    });
});

app.get('/menu/rest/:field/:subject/remove', (req, res)=>{
    let field = req.params.field;
    let subject = req.params.subject;
    let path = `menu/rest/${field}/${subject}`;
    fs.unlink(path, (err) => {
        if (err) throw err;
        console.log(path+' was deleted');
        res.redirect(url.resolve('/menu/rest/', field));
    });
});

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

            let name = () =>{
                if (req.session.logined) {
                    return req.session.user;
                }else{
                    return false;
                }
            }
            let time = `${year}-${month}-${date} (${day})`;

            res.render('main',{title : id, description : data, name : name(), time:time, });
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
        let name = () =>{
            if (req.session.logined) {
                return req.session.user;
            }else{
                return false;
            }
        }
        res.render('main', {title : field, description : files, name : name()});
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
            let name = () =>{
                if (req.session.logined) {
                    return req.session.user;
                }else{
                    return false;
                }
            }

            res.render('main', {
                title: id,
                description : data,
                name : name,
                time : time
            });
        });
    });
});

/* Rest의 세부항목들 보여주기 */
app.get('/menu/rest/:field', (req, res)=>{
    let field = req.params.field;
    let path = `menu/rest/${field}`;
    fs.readdir(path, (err, files)=>{
        if(err){console.log(err);res.send(err);}
        res.render('main',{
            title : field,
            description : files
        });
    });
});

/* 메뉴화면 */
app.get('/menu/:topic/:field', (req, res)=>{
    let topic = req.params.topic;
    let title = req.params.field;
    let path = decodeURI(url.resolve(`menu/`, topic+"/"+title));
    fs.readdir(path, function(err, files){
        if (err){console.log(err);res.send(err);}
        let description = files;
        let name = (() =>{
            if (req.session.logined) {
                return req.session.user;
            }else{
                return false;
            }
        })
        res.render('main', {
            title:title, 
            description:description, 
            name:name()
        });
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
    if (req.session.logined){
        let name = () =>{
            if (req.session.logined) {
                return req.session.user;
            }else{
                return false;
            }
        }
        res.render('main', 
        {
            title:'Title.', 
            description:"Cont.",
            status:'create',
            name : name()
        });
    } else {
        res.redirect('/err');
    }
});

/*글쓰기 후 전송*/
app.post('/write', (req, res)=>{
    if (req.session.logined) {
        let title = req.body.title;
        let description = req.body.description;
        let url = `menu/${req.body.path}/${title}`;
        fs.writeFile(url, description, function(err){
            if (err){console.log(err);res.send(err);}
            res.redirect(url);
        });
    } else {
        res.redirect('/err');
    }
});

app.post('/login', (req, res)=>{
    console.log(req.body.id+" /// "+req.body.pw);
    console.log(process.env.ID+" /// "+process.env.PASSWORD);
    if (req.body.id == process.env.ID && req.body.pw == process.env.PASSWORD) {
        req.session.logined = true;
        req.session.user = process.env.NAME;
    }
    res.redirect('/');
});

app.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/');
});

app.get('/err', (req,res)=>{ res.render('main',{title:'접근 불가', description:'404 ERROR'});});

/*메인화면*/
app.get('/', (req, res)=>{
    try {
        let entry = req.session['logined'];
        if (entry){
            console.log('성공');
            req.session["user"] = 'PL';
            res.render('main', {title:'PL 님', description : '환영합니다.'})
        } else {
            res.render('main', {title:"다양한 콘텐츠 PAT Head", description :"여기는 메인 화면입니다.", name:''});
        }
    } catch {
        res.render('main', {title:"다양한 콘텐츠 PAT Head", description :"여기는 메인 화면입니다.", name:''});
    }
});

/* 서버를 3000포트로 열고 callback함수 실행 */
app.listen(3000, () => {console.log(`Server open port : 3000`);});
