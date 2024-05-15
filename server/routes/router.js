const express = require('express')
const route = express.Router()
const services = require('../services/render')
const {
    createUser,
    findUser,
    updateUser,
    deleteUser
} = require("../controller/controller")

route.get('/',services.homeRoutes);
route.get('/add-user',services.add_users);
route.get('/update-user',services.update_user);

route.post('/api/users', createUser)
route.get('/api/users', findUser)
route.put('/api/users/:id', updateUser)
route.delete('/api/users/:id', deleteUser)



module.exports = route