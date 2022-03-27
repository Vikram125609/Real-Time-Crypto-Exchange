const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = 3000 || process.env.PORT;
const router = require('./routes/route');

// Using Static Filse
app.use(express.static(path.join(__dirname, `/public`)));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting with the database
require('./src/Database/Database.js');

// This is our Models

const model = require('./src/Models/Model');
const signupModel = require('./src/Models/signupModel');

// Setting view engine
app.set('view engine', 'ejs');



app.use(router);

app.listen(PORT, (req, res) => {
  console.log(`Server is connected successfully`);
})


// This is for google authentication
// This is passport

// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET'
// }));

// const passport = require('passport');
// var userProfile;

// app.use(passport.initialize());
// app.use(passport.session());

// app.set('view engine', 'ejs');

// // app.get('/success', (req, res) => res.send(userProfile));
// app.get('/success',(req,res) => res.send(userProfile));
// app.get('/error', (req, res) => res.send("error logging in"));

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

// // This is the setup for Passport

// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = 'our-google-client-id';
// const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
// passport.use(new GoogleStrategy({
//   clientID: `930113505521-bfs33b5ljrpb256u771knrddalcs41rj.apps.googleusercontent.com`,
//   clientSecret: `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`,
//   callbackURL: "http://localhost:5000/auth/google/callback"
// },
//   function (accessToken, refreshToken, profile, done) {
//     userProfile = profile;
//     return done(null, userProfile);
//   }
// ));

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function (req, res) {
//     // Successful authentication, redirect success.
//     res.redirect('/success');
//   });
