const router = require('express').Router();
const Todo = require('../models/book');

router.get('/', (req, res)=>{
    Book.findAll()
    .then((books) => {
        if (!books.length) return res.status(404).send({err : 'book not found'});
        res.send(`find successfully : ${books}`);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/bookid/:bookid', (req, res)=>{
    bok.findOneByBookid
})