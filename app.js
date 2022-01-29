const path = require('path');
const PORT = process.env.PORT || 5000;

const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const corsOptions = { 
  origin: "https://cse341-patrick.herokuapp.com/",
  optionsSuccessStatus: 200
};



const errorController = require('./controllers/error');

const app = express();
app.use(cors(corsOptions));

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


const options = {
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://patrick:6BcyuIob7wGWGPXh@cluster0.6oqmc.mongodb.net/test?retryWrites=true&w=majority";
// Cluster0

// mongoose
//   .connect(
//     MONGODB_URL, options
//   )
//   .then(result => {
//     console.log('connected to db')

//      // This should be your user handling code implement following the course videos
//     app.listen(PORT);
//   })
//   .catch(err => {
//     console.log(err);
//   });

  mongoose.connect(MONGODB_URL, 
    {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true
    }
  );


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
  app.listen(PORT);
});

// db.products.insert( { item: "card", qty: 15 } )



// app.listen(PORT);


