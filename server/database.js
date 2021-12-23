// connect db
const mongoose = require('mongoose');

const uri = 'mongodb+srv://houdret:dbJilou2021@cluster0.3n9cx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;