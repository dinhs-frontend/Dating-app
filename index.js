const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
const slug = require('slug')
const mongo = require('mongodb');
const session = require('express-session')

// const eten = [
//     {
//         name: 'pasta',
//     },

//     {
//         name: 'pho',
//     },

//     {
//         name: 'pizza',
//     },

// ]

const persoon1 = [
  {
    name: 'Flux',
    age: '23',
    hobby: 'netflix',
  }
]

const persoon2 = [
  {
    name: 'Lauryn',
    age: '21',
    hobby: 'netflix',
  }
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
app.post('/topics', add);//-3--//
app.get('/add', form); //-2-//
app.post('/remove', remove)
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))
//------------------------------------------//
// app.delete ('/topics' , deleteOne);


//error >> kan pagina niet vinden
app.use(function(req, res, next) {
    res.status(404).render('404.ejs');
});


// functies voert uit
function topics (req,res) {
  console.log('Topics data =', data)

    res.render ('topics.ejs',{data: eten})
} ///--1--//

function form(req, res) {
    res.render('add.ejs')
  } //-2-//

function add(req, res, next) {
    db.collection('topics').insertOne({
      name: req.body.name,
      
    }, done)//-3--//

    function done(err, data) {
        if (err) {
            next (err)
        } else {
            res.redirect('/topics' )
        }
      }
    }

    function topics(req, res, next) {
      
        db.collection('topics').find().toArray(done)
      
        function done(err, eten) {
          // console.log('Topics data =', eten)
          if (err) {
            next(err)
          } else {
            res.render('topics.ejs', {data: eten})
          }
        }
      } 

    
//-----------verwijder topics------------//
      // function remove(req, res, next) {
      //   var id = req.body.food_id

      //   db.collection('topics').deleteOne({
      //      _id: id
      //   }, done)
      
      //   function done(err, eten) {
      //     console.log('Topics data =', eten)
      //     if (err) {
      //       next(err)
      //     } else {
      //       res.render('topics.ejs', {data: eten})
      //     }
      //   }
      // } 

      //----------------------------------------//
        
      function remove(req, res, next) {
        var id = req.body.food_id

        db.collection('topics').deleteOne({
           _id: new mongo.ObjectID(id)
        }, done)
      
        function done(err, eten) {
          console.log('Topics data =', eten)
          if (err) {
            next(err)
          } else {
            res.render('topics.ejs', {data: eten})
          }
        }
      } 

        
//-----------------------------------------------------///
// function deleteOne (req, res, next) {
//   var id = req.body.food_id

// db.collection('topics').deleteOne({
//            _id: id
//         }, done)

//         function done(err, eten) {
//           console.log('Topics data =', eten)
//           if (err) {
//             next(err)
//           } else {
//             res.render('topics.ejs', {data: eten})
//           }
//         }
//       }

      //Bron: github examples
//--------------------------------------------------------//

