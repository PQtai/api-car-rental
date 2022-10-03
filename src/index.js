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