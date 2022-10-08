import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/Database.config.js';
import routes from './api/routes/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://api-rental-carl.herokuapp.com");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json({limit : "50mb"}));
//Connect database
db.connect(process.env.MONGODB_URL);
//routes
routes(app);

app.listen(PORT ,() =>{
    console.log(`App listening on port ${PORT}`);
} );