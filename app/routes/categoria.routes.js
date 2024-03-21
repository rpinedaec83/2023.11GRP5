const controller = require('../controllers/categoria.controller');
const { authJwt } = require("../middlewares");

module.exports = (app)=>{
    app.post('/api/categoria/add', controller.post);
    app.get('/api/categoria/',controller.getAll);
    app.put('/api/categoria/:id',controller.put);
    app.get('/api/categoria/:id',controller.getById);
};