const express = require('express');
const users = require('./routes/users');
const posts = require('./routes/posts');
const profile = require('./routes/profile');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./config/passport');
const {
    mongoUri
} = require('./config/keys');

const app = express();

mongoose.connect(mongoUri).then(() => console.log('Connected to db')).catch((error) => console.log(JSON.stringify(error, null, 4)));
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});