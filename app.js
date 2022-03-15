const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001;
const {MONGOURI} = require('./keys');

//require the user Models
require('./models/user');
app.use(express.json())
//use/require the authenticate route
app.use(require('./routes/auth'))


//connect to the mongoDB
mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=> {
    console.log("connected to the MongoDB");
})
mongoose.connection.on('error', ()=>{
    console.log('Error logging on to MongoDB');
})


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})