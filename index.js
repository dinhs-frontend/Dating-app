
var express = require('express')
const ejs = require('ejs')

express()
    .use(express.static('static'))
    .set ('view engine', 'ejs')
    .set ('views', 'view')
    .get('/', home)
    .get('/about', about)
    .get ('/404',notFound)
    
    .get ("/", (req,res) => resend(""))
    .listen(8000)

    function home (req, res) {
        res.status(200).send('server says hello')
    }

    function about (req, res) {
        res.status(200).send('about page')
    }
    function notFound (req, res) {
        res.status(404).render('not-found.ejs')
    }





