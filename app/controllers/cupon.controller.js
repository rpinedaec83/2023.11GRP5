const db = require("../models");
const Cupon = db.cupon;
const Curso = db.curso;

exports.post = (req,res)=>{
    try {
        const {descuento,curso} = req.body;
        if(!descuento||!curso){throw new Error("Formato incorrecto!");}
        const codigo = Math.random().toString(30).substring(2);
        Curso.findById(curso).then((data)=>{
            if(data){
                const objCupon = {codigo,descuento,curso};
                const cupon = new Cupon(objCupon);
                cupon.save((err,data)=>{
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
        res.status(400).send(error.message);
    }
};
exports.put = (req,res)=>{
    try {
        const {codigo,descuento,curso} = req.body;
        const idCupon = req.params.id;
        if(!codigo||!descuento||!curso){throw new Error("Formato incorrecto!");}
        Cupon.findById(idCupon).then((data)=>{
            if(data){
                if(!titulo || !precio){
                    throw new Error("Formato incorrecto!");
                }
                const objCupon = {codigo,descuento,curso};
                Cupon.findOneAndUpdate({_id:idCupon},objCupon).then((data)=>{
                    res.send({before:data,modified:objCupon});
                },(err)=>{
                    res.status(500).send(err);
                });
            }
        },(err)=>{
            res.status(404).send(err);
        });
    } catch (error) {
        res.status(400).send(err);
    }
};
exports.getAll = (req,res)=>{
    try {
        Cupon.find({}).then((data)=>{
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
        res.status(400).send(err);
    }
};
exports.getById = (req,res)=>{
    try {
        const idCupon = req.params.id;
        Cupon.findById(idCupon).then((data)=>{
            res.send(data)
        },(err)=>{
            res.status(404).send(err);
        });
    } catch (error) {
        res.status(400).send(err);
    }
};

exports.getByFiltros=(req,res)=>{
    try {
        const { curso } = req.body;
        const filtro = {};
        if (curso) {
            filtro.titulo = { $regex: '.*' + curso + '.*' };
        }
        Curso.findOne(filtro).then((data) => {
            const idCurso = data._id;
            Cupon.find({curso:idCurso}).then((cupones)=>{
                res.send(cupones);
            },(err)=>{
                res.status(404).send(err);
            });
        }, (err) => {
            res.status(404).send(err);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};