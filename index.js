const express = require('express');
const app = express();
const port = 2000;

app.listen(port);
app.use(express.static('static')) 
app.set ('view engine', 'ejs')     
app.set('views', 'view')   

// app.get ('/', (req, res) => res.send ('hello world'));
app.get ('/', (req, res) => res.render ('index.ejs'));

app.get ('/not-found', (req, res, next) => {
    res.render('not-found.ejs', {
        title: 'Not found!',
        showTitle: false, 
        description: 'Yo bro het werkt niet man SORRY!',
     });
});

app.get ('/topics', (req, res, next) => {
    res.render('topics.ejs', {
        title: 'test', 
        showTitle: false,
        data: [ 'pasta', 'pho', 'pizza', 'patat']
    });
});

app.use(function(req, res, next) {
    res.status(404).render('404.ejs');
});



    // .use(function (req, res, next) {
    //     res
    //         .status(404)
    //         .send('That does not exist');
    // });

// const express = require('express') 
// const ejs = require('ejs') express()
// .use(express.static('static'))     
// .set ('view engine', 'ejs')     
// .set('views', 'view')     
// .get('/', home)     
// .get('/about', about)      
// .get('/404',notFound) 
// .get ("/", (req,res) => resend("")) .listen(8000) 

// function home (req, res) {     res.status(200).send('server says hello') } 
// function about (req, res) {     res.status(200).send('about page') } 
// function notFound(req, res) {     res.status(404).render('not-found.ejs') }
