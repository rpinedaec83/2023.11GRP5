const db = require("../models");
const Curso = db.curso;
const Categoria = db.categoria;

exports.post=(req,res)=>{
    try {
        const {titulo,descripcion,precio,categoria} = req.body;
        Categoria.findById(categoria).then((data)=>{
           if(data){
            if(!titulo || !precio){
                throw new Error("Formato incorrecto!");
            }
            const objCurso = {titulo,descripcion,precio,categoria};
            const curso = new Curso(objCurso);
            curso.save((err,data)=>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                else{
                    res.send(data);
                }
            });
           }
        },(err)=>{
            res.status(400).send(err.message);
        });
    } catch (error) {
        res.status(500).send(err.message);
    }
};
exports.put=(req,res)=>{
    try {
        const {titulo,descripcion,precio,categoria} = req.body;
        const idCurso = req.params.id;
        Categoria.findById(categoria).then((data)=>{
           if(data){
            if(!titulo || !precio){
                throw new Error("Formato incorrecto!");
            }
            const objCurso = {titulo,descripcion,precio,categoria};
            Curso.findOneAndUpdate({_id:idCurso},objCurso).then((data)=>{
                res.send({before:data,modified:objCurso});
            },(err)=>{
                res.status(404).send(err);
            });
           }
        },(err)=>{
            res.status(400).send(err.message);
        });
    } catch (error) {
        
    }
};
exports.getAll=(req,res)=>{
    try {
        Curso.find({}).then((data)=>{
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
exports.getById=(req,res)=>{
    try {
        const idCurso = req.params.id;
        Categoria.findOne({_id:idCurso}).then((data)=>{
            res.send(data);
        },(err)=>{
            res.status(404).send(err);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};