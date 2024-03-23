const controller = require('../controllers/checkout.controller');

module.exports = (app)=>{
    app.post('/api/checkout/add', controller.post);
    app.get('/api/checkout/',controller.getAll);
};