const User = require('../models/user');

exports.addUser = (req, res, next) => {
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
                    return res.status(400).json({success: false, message: err.name});
                };
                res.status(500).json({success: false, message: err});
            });
    } else {
        res.status(400).json({success: false, message: 'bad parameters'});
    }
};

exports.logUser = (req, res, next) => {
    const {email, password} = req.body;

    if(email.length > 0 && password.length > 0) {
        User.findAll({where: {email: email}})
            .then(users => {
                console.log('U  S  E  R  S : ', users[0]);
                const user = users[0];
                if(!user) {
                    return res.status(400).json({success: false, message: 'user does not exist'});
                }
                console.log('user password: ', user.password);
                if(user.password === password){
                    res.status(200).json({success: true, message: 'user found'});
                } else {
                    res.status(401).json({success: false, message: 'password is incorrect'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({success: false, message: err});
            });
    } else {
        res.status(400).json({success: false, message: 'bad parameters'});
    }
};