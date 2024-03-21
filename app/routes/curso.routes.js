const controller = require("../controllers/curso.controller");
const { authJwt } = require("../middlewares");

module.exports = (app)=>{
    app.post('/api/curso/add',controller.post);
    app.get('/api/curso/all', controller.getAll);
    app.put('/api/curso/:id',controller.put);
    app.get('/api/curso/:id',controller.getById);
    app.get('/api/curso/', controller.getByFiltros);
};