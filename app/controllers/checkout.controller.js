const db = require("../models");
const Checkout = db.checkout;
const Cupon = db.cupon;
const Curso = db.curso;

exports.post = (req,res)=>{
    try {
        const { usuario, curso, cupon } = req.body;
        if(!usuario||!curso){throw new Error("Formato incorrecto!");}
        Curso.findById(curso).then((response)=>{
            const checkout = new Checkout({usuario:usuario, curso:curso, cupon:""});
            const cursoFound = response;

            console.log(checkout);

            if(cupon){
                checkout.cupon = cupon;
                Cupon.findOne({codigo:cupon,curso:curso}).then((response)=>{
                    const cuponFound = response;
                    cursoFound.precio = cursoFound.precio*(1-(cuponFound.descuento/100));
                },(err)=>{
                    res.status(404).send(`Cupon ${cupon} NO válido!`);
                });
            }

            checkout.save((err,data)=>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                else{
                    data.precio = cursoFound.precio;
                    res.send({data,precio:data.precio});
                }
            });
        },(err)=>{
            res.status(404).send(err.message);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.getAll = (req,res)=>{
    try {
        Checkout.find({}).then((data)=>{
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