const db = require("../models");
const Categoria = db.categoria;

exports.post = (req,res)=>{
    try {
        const {nombre,descripcion} = req.body;
        // console.log(nombre);
        // console.log(descripcion);
        if(!nombre){throw new Error("Formato incorrecto!");}
        if(!descripcion){throw new Error("Formato incorrecto!");}

        const objCategoria = {nombre,descripcion};
        const categoria = new Categoria(objCategoria);
        categoria.save((err,data)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            else{
                res.send(data);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.getById = (req,res)=>{
    try {
        const idCategoria = req.params.id;
        Categoria.findOne({_id:idCategoria}).then((data)=>{
            res.send(data);
        },(err)=>{
            res.status(500).send(err);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.getAll = (req,res)=>{
    try {
        Categoria.find({}).then((data)=>{
            if (data) {
                res.send(data);
            }
        }).catch((err)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.put = (req,res)=>{
    try {
        const idCategoria = req.params.id;
        const {nombre,descripcion} = req.body;
        // console.log(nombre);
        // console.log(descripcion);
        if(!nombre){throw new Error("Formato incorrecto!");}
        if(!descripcion){throw new Error("Formato incorrecto!");}

        const objCategoria = {nombre,descripcion};   
        Categoria.findOneAndUpdate({_id:idCategoria}, objCategoria).then((data)=>{
            res.send({before:data,modified:objCategoria});
        },(err)=>{
            res.status(500).send(err);
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
};