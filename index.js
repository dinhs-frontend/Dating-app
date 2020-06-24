const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
const slug = require('slug')
const mongo = require('mongodb');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);


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


app.get ('/',findname);
app.get('/add', form); //-2-//
app.get('/account', account); //--1--//
// app.get ('/topics',sessionAdd);
app.get('/topics', topics);

app.post('/remove', remove);
app.post('/topics', add);//-3--//
//------------------------------------------------//

// app.post('/edit-account', addDataProfile)
// app.get('/', getAccount)

// app.post('/', account)
// app.post('/',update);

// const db1 = mongo.connection

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  // store: new MongoStore({ mongooseConnection: db1 })
}));
//------------------------------------------//
// app.delete ('/topics' , deleteOne);


//error >> kan pagina niet vinden
app.use(function(req, res, next) {
    res.status(404).render('404.ejs');
});

////------------------findname: dropdown----------------------------------//
function findname (req, res, next) {
 
let test = db.collection('naam').find().toArray(function (err, dataObjArr) {
  // console.log('err =', err);
  // console.log('data =', dataObjArr);
  
  res.render('index.ejs',{data: dataObjArr})
  })

} 
//----------------find topics-----------------//
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

      // db.collection('naam').insertOne(
      //   req.session.user, done)
  
      //  function done(err) {
      //         if (err) {
      //           next(err)
      //            } 
      //         else {
      //            res.render('topic.ejs')
      //           }
      //       }
  

//----------------------------------------------------//

function form(req, res) {
    res.render('add.ejs')
  } //-2-//

//-----------add topics-----------//
function add(req, res, next) {
  //   req.session.user = {
  //   name: req.body.name,

  // }
  db.collection('naam').insertOne(
    req.session.user, done)

    // db.collection('topics').insertOne({
    //   name: req.body.name,
      
    // }, done)//-3--//

    function done(err, data) {
        if (err) {
            next (err)
        } else {
            res.redirect('/topics' )
        }
      }
    }

    // async function sessionAdd(req, res) { 
    //   let user = await db.collection('naam').findOne({'_id': mongodb.ObjectID(req.session.user._id)}); //stored globally for re-use
    //   res.render('topics', {data: user});
    // }


    // async function sessionAdd(req, res, err) {
    //   var id = req.session.user._id
    //   const user = await db.collection('naam').findOne({'_id': mongo.ObjectID(id)}); 
    //   console.log(req.session.user)
    //   res.render('topic.ejs', {user})


      // async function sessionAdd(req, res) {
      //   if (req.session.user){
      //     res.render('topics', {user: await db.collection('naam').findOne({_id: mongo.ObjectID(req.session.user._id)})});
      //   } else {
      //     res.redirect('/404') //als je geen profiel hebt krijg je een error page
      //   }
      // }
          
          // if (req.session.user === fluxUser) {
      
          //     res.redirect('topic.ejs')
      
          // } else {
          //     (value === persoon1)
          //     res.status(401).send("werkt niet")
      
          // }
  
       //--------------verwijder topics-------------//
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

//----------------------------------------------//
      function account(req, res) {
        res.render('account.ejs')
      } //-2-//
//----------------------test session-------------------------------//


// function addDataProfile (req, res) {
//   req.session.user = { 
//     userdata: req.body.userdata,
    
//   }

//   db.collection('naam').insertOne(req.session.user, done);
//   function done(err, data){
//     if(err){
//       next(err);
//     } else {
//       console.log(req.session.user)
//       // console.log(req.session)
//       res.redirect('/');
//     }
//   }
// }

//   async function getAccount (req, res) {

//     let user = await db.collection('naam').findOne({'_id': mongo.ObjectID(req.session.user._id)});
//     console.log(user.name)
//     console.log(user)
//     res.render('/',{user})
//   }
  

 //---------------------------------------------/
        
// let descriptionUser = db.collection('naam').findOne({_id: ObjectId("546cb92393f464ed49d620db")}).toArray()


    
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
     
        
    // function update(req, res, next) {
    //   var des = req.body.description

    //   db.collection('naam').updateOne({
      //     _id: new mongo.ObjectID(des)
      //  }, done)
      // }

      // function done(err, eten) {
      //   if (err) {
      //     next(err)
      //   } else {
      //     res.render('/')
      //   }
      // }
//Bronnen:
//- Slide
//- klasgenoten
//- examles
