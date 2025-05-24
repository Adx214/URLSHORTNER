const express = require('express');
const router = express.Router();
const short = require('shorthash')
const conn = require('../config/db');
const url = require('../schema/url');
const user = require('../schema/user')
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
})

const mongoose = require('mongoose');

router.post('/shorturl', async (req, res) => {
    if (req.isAuthenticated()) {
        const lurl = req.body.url;
        const hash = short.unique(lurl);
        const name = req.body.name;
        const id = req.body.id;
        const shorturl = `http://localhost:5050/gt/${hash}`;



        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid or missing user id for createdBy' });
        }

        const URL = new url({
            url: lurl,
            name: name,
            hash: hash,
            shortenurl: shorturl,
            createdBy: id
        });

        try {
            await URL.save();
            console.log(URL);

            res.status(200).json({
                message: 'URL shortened',
                data: URL
            });
        } catch (error) {
            res.status(500).json({ message: 'Error saving URL', error: error.message });
        }

    } else {
        res.status(400).json({ message: "please login" })

    }
});

router.post('/register', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, userid, password } = req.body;
        const pass = await bcrypt.hash(password, 10);
        const u = await new user({
            name: name,
            userid: userid,
            password: pass
        });
        await u.save();
        res.status(201).json(u);
    } catch (error) {
        if (error.code == 11000) {
            res.status(500).json({ message: 'UserId exists please try something unique or new', error: error.message })
        } else {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }
})

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(200).json({ message: "LOGIN SUCCESSFUL", user: req.user });

});
router.get('/geturls/:id', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const id = req.params.id;
            const urls = await url.find({ "createdBy": id });
            res.status(200).json(urls);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching URLs', error: error.message });
        }
    } else {
        res.status(400).json({ message: "please login" })
    }

})

router.get("/gt/:code", async (req, res) => {
    const code = req.params.code;
    console.log(code);


    try {
        const d = await url.findOne({ hash: code })
        console.log(d.url);

        res.redirect(d.url)
    } catch (error) {
        res.json({
            message: 'URL not found',
            data: error
        })
    }
})

router.get('/logged', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: "User is logged in", user: req.user });
    } else {
        res.status(400).json({ message: "User is not logged in" });
    }
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "User logged out" });
    });
});
router.get('/delete/:id', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const id = req.params.id


            const del = await url.findByIdAndDelete(id)
            if (!del) {
                return res.status(404).json({ message: 'URL not found' })
            } else {
                res.status(200).json({ message: 'URL deleted successfully' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting URL', error: error.message })
        }

    }

})
router.get('/search', async (req, res) => {
    if (req.isAuthenticated()) {

        const query = {
            name: { $regex: req.query.name || '', $options: 'i' },
            createdBy: req.query.createdBy || ''
        };
        const urls = await url.find(query)
        if (!urls) {
            return res.status(404).json({ message: 'URL not found' })
        } else {
            res.status(200).json({ message: 'URL found', data: urls })
        }
    } else {
        res.status(400).json({ message: 'Please login' })
    }
})

module.exports = router;
