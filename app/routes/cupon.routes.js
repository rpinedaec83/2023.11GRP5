const controller = require("../controllers/cupon.controller");
module.exports = (app)=>{
    app.post('/api/cupon/add', [authJwt.verifyToken,authJwt.isAdmin], controller.post);
    app.get('/api/cupon/',[authJwt.verifyToken],controller.getAll);
    app.put('/api/cupon/:id',[authJwt.verifyToken,authJwt.isAdmin],controller.put);
    app.get('/api/cupon/:id',[authJwt.verifyToken],controller.getById);
};