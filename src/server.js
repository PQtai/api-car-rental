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
// Add headers before the routes are defined
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
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