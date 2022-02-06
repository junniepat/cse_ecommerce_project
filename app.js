const path = require('path');
const PORT = process.env.PORT || 5000;

const cors = require('cors');


const express = require('express');
const bodyParser = require('body-parser');

const corsOptions = { 
  origin: "https://cse341-patrick.herokuapp.com/",
  optionsSuccessStatus: 200
};
 

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

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


mongoConnect(() => {
  app.listen(PORT);
});


 



// app.listen(PORT);


