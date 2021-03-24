const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB');
});


//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);



//create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});


app.listen(9000, () => {
    console.log("Running at 9000");
});