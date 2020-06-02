const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
const slug = require('slug')
const mongo = require('mongodb');

const eten = [
    {
        name: 'pasta',
    },

    {
        name: 'pho',
    },

    {
        name: 'pizza',
    },

]


require('dotenv').config();

const url = 'mongodb+srv://' + process.env.DB_NAME + ':' + process.env.DB_PSW + '@' + process.env.DB_HOST;
let db;

mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      throw err;
    } 
    db = client.db(process.env.DB_NAME);
  });




app.listen(port);
app.use(express.static('static')) 
app.use(bodyParser.urlencoded({extended: true}))
app.set ('view engine', 'ejs')     
app.set('views', 'view')  


app.get ('/', (req, res) => res.render ('index.ejs'));
app.get('/topics', topics); //--1--//
app.post('/topics', add)
app.get('/add', form); //-2-//


//error >> kan pagina niet vinden
app.use(function(req, res, next) {
    res.status(404).render('404.ejs');
});//--3--//


// functies voert uit
function topics (req,res) {
    res.render('topics.ejs',{data: eten})
} ///--1--//


function form(req, res) {
    res.render('add.ejs')
  } //-2-//

function add(req, res) {
    var id = slug(req.body.name).toLowerCase()

    eten.push({
        id: id,
        name: req.body.name,
        
    })

res.redirect('/topics')
}

////Mongo test
// function add(req, res, next) {
//     db.collection('topics').insertOne({
//       name: req.body.name,
      
//     } 
//     )
// }