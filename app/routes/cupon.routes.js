const controller = require("../controllers/cupon.controller");
const { authJwt } = require("../middlewares");
module.exports = (app)=>{
    app.post('/api/cupon/add', [authJwt.verifyToken, authJwt.isAdmin],controller.post);
    app.get('/api/cupon/',controller.getAll);
    app.put('/api/cupon/:id',controller.put);
    app.get('/api/cupon/:id',controller.getById);
};