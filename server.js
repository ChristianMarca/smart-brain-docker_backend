const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
var knex = require('knex')
const morgan= require('morgan'); 

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image')

const db=knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
    // connection: {
    //     host: process.env.POSTGRES_HOST,
    //     user: process.env.POSTGRES_USER,
    //     password: process.env.POSTGRES_PASSWORD,
    //     database: process.env.POSTGRES_DB
    // //   host : '127.0.0.1',
    // //   user : 'postgres',
    // //   password : 'qsqqpEjOTN0C',
    // //   database : 'smartbrain'
    // }
  });

// db.select('*').from('users').then(data=>{
//     console.log(data)
// });

const app = express();
// console.log('')

app.use(bodyParser.json());

app.use(morgan('combined') )

app.use(cors());


app.get('/', (req, res) => {
    res.json('Hola ')
    // db.select('*').from('users').then(user=>res.json(user))
})

app.post('/signin', signin.handleSignin(db,bcrypt))
//Los mismo que por funciones vanzadas
//app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)} )

app.post('/profile/:id',(req,res)=>{profile.handleProfileUpdate(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{image.handleAPICall(req,res)})



// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });

app.listen(3000, () => {
    console.log('App corriendo en el puerto 3000')
})