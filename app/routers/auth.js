const express = require('express');

const auth = express()

const isAdminExsist = require('../middleware/isAdminExist');
const adminController = require('../controllers/admin.controller')

auth.post('/signIn', adminController.signIn)
auth.post('/signUp', isAdminExsist, (req, res) => {
    adminController.signUp(req, res)
})

module.exports = auth