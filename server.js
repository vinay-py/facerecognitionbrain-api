const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'aa13swaih9vf45m.cnh04ctnmo0t.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'postgres',
	database: 'dbface'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) => {res.send(`It is working! ${process.env.PORT} ${process.env.RDS_PORT}`)})
app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => { 
	register.handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})