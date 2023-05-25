import express from 'express';
import mongoose from 'mongoose';
import PhoneModel from './models/Phone.js';
import * as PhoneController from './controllers/phoneController.js';
import {phoneCreateValidation} from './validation/validations.js';

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

app.get('/phones', PhoneController.getAll);
app.get('/phones/:id', PhoneController.getOne);
app.post('/phones/', phoneCreateValidation, PhoneController.create);
app.delete('/phones/:id', PhoneController.remove);
app.patch('/phones/:id', PhoneController.update);

app.listen(8080, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('http://localhost:8080/');
})
