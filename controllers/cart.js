const Cart = require("../models/Cart");

exports.create = (req, res) => {
    const newCart = new Cart(req.body);

    newCart.save(newCart)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });
};

exports.myCart = (req, res) => {
    const cart = Cart.findOne({ userId: req.params.userId }).then(cart => {
        res.status(200).json(cart);
    }).catch(err => {
        res.status(500).json({
            message: err || "Something went worng!",
        })
    });
};

exports.update = (req, res) => {
    Cart.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        {
            new:true,
        }
    ).then(data=>{
        res.status(201).json("Cart updated successfully!");
    }).catch(err=>{
        res.status(500).json("Something went wrong!");
    })
}

exports.delete=(req,res)=>{
    Cart.findByIdAndDelete(req.params.id)
    .then(data=>{
        res.status(200).json("Cart deleted successfully!");
    }).catch(err=>{
        res.status(500).json("Something went wrong!");
    });
}
// for admin
exports.carts = (req, res) => {
    Cart.find().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: err || "Something went worng!",
        })
    });
};

