import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';


import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';


const port = process.env.PORT || 3333; 


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

// app.get('/users', (request, response) => {
//     return response.json({message: "Hello World"});
// })

app.listen(port, () => {
    console.log('App is running on port',port);
});