const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const validator = require('email-validator');

const models = require('../models');


// Post avtarizacii
router.post('/register', (req, res) => {
    const nick = req.body.nick.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const password2 = req.body.passwordConfirm;

    if (!nick || !email || !password || !password2) {
        res.json({
            ok: false,
            error: 'Vse polya doljn@ b@t zapolnen@',
            fields: ['nick', 'email', 'password', 'password2']
        });
    } else if (!validator.validate(email)) {
        res.json({
            ok: false,
            error: 'Ne validn@ email',
            fields: ['email']
        });
    } else if (nick.length < 3 || nick.length > 16) {
        res.json({
            ok: false,
            error: 'Dlina nika ot 3 do 16 simvolov',
            fields: ['nick']
        });
    } else if (password !== password2) {
        res.json({
            ok: false,
            error: 'Paroli ne sovpadayut',
            fields: ['password', 'password2']
        });
    } else {
        models.User.findOne({nick}).then(user => {
            console.log(user);
            if (!user) {
                bcrypt.hash(password, null, null, (err, hash) => {
                    models.User.create({
                        nick,
                        email,
                        password: hash
                    }).then(user => {
                        console.log(user)
                        return res.json({
                            ok: true
                        });
                    }).catch(err => {
                        return res.json({ 
                            ok: false,
                            error: err
                        });
                    })
                });
                models.User.findOne({email: email}).then(email => {
                    console.log(email);
                    if (!email) {
                        // bcrypt.hash(password, null, null, (err, hash) => {
                        //     models.User.create({
                        //         nick,
                        //         email,
                        //         password: hash
                        //     }).then(user => {
                        //         console.log(user)
                        //         res.json({
                        //             ok: true
                        //         });
                        //     }).catch(err => {
                        //         res.json({ 
                        //             ok: false,
                        //             error: err
                        //         });
                        //     })
                        // });
                    } else {
                        return res.json({ 
                            ok: false,
                            error: 'Email uje zanyat',
                            fields: ['email']
                        });
                    }
                });
                
            } else {
                return res.json({ 
                    ok: false,
                    error: 'Nik uje zanyat',
                    fields: ['nick']
                });
            }
        });
    }
    
});

module.exports = router;


