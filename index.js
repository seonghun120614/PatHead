const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('main');
});

app.listen(3000, () => {
    console.log('Server open port : 3000');
});