const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = require('../../db/models');

require('dotenv').config()

const Admin = db.Admin

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN, { expiresIn: '1800s' })
}

const signUp = (req, res, next) => {

    const password = bcrypt.hashSync(req.body.password, 10)

    const admin = {
        nama: req.body.nama,
        email: req.body.email,
        password: password,
    }

    Admin.create(admin)
    .then((result) => {
        res.send(result)    
    }).catch((err) => {
        res.status(500).send({
            message: 'Error Occured while creating account!',
            error: err,
          });
    });
}

const signIn = (req, res) => {
    const admin = {
        email: req.body.email,
        password: req.body.password
    }

    Admin.findOne({
        where: {
            email: admin.email
        }
    })
    .then((result) => {
        const decPass = bcrypt.compareSync(admin.password, result.password)
        if (result && decPass) {
            result.token = generateAccessToken({email: result.email})
        }
        if (!decPass || !admin.email) {
            res.status(403).send({
                message: 'Email or password is incorrect!',
                error: err
              });
        }
        res.send(result)
    }).catch((err) => {
        res.status(404).send({
            message: 'Error while signing Admin!',
            error: err
          });
    });
}

module.exports = {
    signUp,
    signIn
}

