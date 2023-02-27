
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const port = process.env.port || 5000
// const {MONGOURI}  = require('./keys')
const app = require('./app');
const requireLogin = require('./middleware/requireLogin');

mongoose.connect(process.env.MONGOURI,
 { 
    useNewUrlParser: true,
     useUnifiedTopology: true,
      useFindAndModify: false 
    });
    mongoose.connection.on('connected',()=>{
        console.log("Connected to MONGO!!!")
    })


app.listen(port, () => console.log(`App listening on port ${port}!`));