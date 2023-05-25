import express from 'express';
import mongoose from 'mongoose';
import PhoneModel from './models/Phone.js';
import * as PhoneController from './controllers/phoneController.js';
mongoose.connect('mongodb://127.0.0.1:27017/phonesDB')
    .then(()=>{
        console.log('db connected');
    })
    .catch((err)=>{
        console.log('db error', err);
    });

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello, world!');
});


app.post('/addPhone', PhoneController.create);

app.get('/getPhones', PhoneController.get);

app.listen(8080, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('http://localhost:8080/');
})
