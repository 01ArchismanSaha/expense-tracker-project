const express  = require('express');
const app = express();
const body_parser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user');

const data_base = require('./util/database');

const cors = require('cors');

app.use(body_parser.json());
app.use(cors());

app.use('/sign-up', (req, res, next) => {
    console.log('request body: ', req.body); 
    const {name, email, password} = req.body;

    if(name.length > 0 && email.length > 0 && password.length > 0) {
        User.create(
            {
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password
            })
            .then(() => {
                res.status(200).send({success: true, message: 'new user created'});
            })
            .catch(err => {
                if(err.name === 'SequelizeUniqueConstraintError'){
                    return res.status(403).json({success: false, message: err.name});
                };
                res.status(500).json({success: false, message: err});
            });
    } else {
        res.status(500).json({success: false, message: 'bad parameters'});
    }
});

// data_base.sync({force: true})
data_base.sync()
    .then(() => {
        app.listen('4000');
    })
    .catch(err => console.log(err));
