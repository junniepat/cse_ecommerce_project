const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require('cors')

const express = require('express');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: "https://cse341-patrick.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const errorController = require('./controllers/error');

const app = express();

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

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://<username>:<username>@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";
// Cluster0
// mongoose
//   .connect(
//     MONGODB_URL, options
//   )
//   .then(result => {
//      // This should be your user handling code implement following the course videos
//     app.listen(PORT);
//   })
//   .catch(err => {
//     console.log(err);
//   });


app.listen(PORT);


