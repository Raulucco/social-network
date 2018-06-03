const express = require('express');
const users = require('./routes/users');
const posts = require('./routes/posts');
const profile = require('./routes/profile');
const app = express();
const mongoose = require('mongoose');
const {
    mongoUri
} = require('./config/keys');

mongoose.connect(mongoUri).then(() => console.log('Connected to db')).catch((error) => console.log(JSON.stringify(error, null, 4)));
const PORT = process.env.PORT || 5000;
app.get('/', () => {

});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});