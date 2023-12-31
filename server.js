const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');

require('dotenv').config();
const passport = require('passport');
const cors = require('cors');

// const whitelist = ['http://localhost:4200'];
const whitelist = ['http://localhost:3000', 'http://localhost:5000','https://bhejo.netlify.app','https://bhejo-backend.onrender.com','https://bhejo-backend.onrender.com/api'];
const corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

// Loading routers
const productRouter = require('./routes/api/productRouter');
const userRouter = require('./routes/api/userRouter');
const bidRouter = require('./routes/api/bidRouter');
const favoriteRouter = require('./routes/api/favoriteRouter');

const app= express();
app.use(cors(corsOptionsDelegate))
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const mongoURI = process.env.mongoURI;

// Connect to mongo
mongoose.connect(mongoURI,{ useNewUrlParser: true, useCreateIndex: true,useFindAndModify:false,useUnifiedTopology: true})
.then(()=> {console.log("MongoDB Connected");})
.catch(err => console.log(err));

app.use(passport.initialize());

// Use routes
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);
app.use('/api/bids',bidRouter);
app.use('/api/favorites',favoriteRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    console.log("production")
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 10000;

app.listen(port, ()=> console.log(`Server started running on port ${port}`));
