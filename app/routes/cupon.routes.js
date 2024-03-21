const controller = require("../controllers/cupon.controller");
module.exports = (app)=>{
    app.post('/api/cupon/add', controller.post);
    app.get('/api/cupon/',controller.getAll);
    app.put('/api/cupon/:id',controller.put);
    app.get('/api/cupon/:id',controller.getById);
};