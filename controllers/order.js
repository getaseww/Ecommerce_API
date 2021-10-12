const Order = require("../models/Order");

exports.create = (req, res) => {
    const newOrder = new Order(req.body);

    newOrder.save(newOrder)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred!"
            });
        });
};

exports.myOrders = (req, res) => {
    Order.find({ userId: req.params.userId }).then(orders => {
        res.status(200).json(orders);
    }).catch(err => {
        res.status(500).json({
            message: err || "Something went worng!",
        })
    });
};

exports.update = (req, res) => {
    Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        {
            new:true,
        }
    ).then(data=>{
        res.status(201).json("Order updated successfully!");
    }).catch(err=>{
        res.status(500).json("Something went wrong!");
    })
}

exports.delete=(req,res)=>{
    Order.findByIdAndDelete(req.params.id)
    .then(data=>{
        res.status(200).json("Order deleted successfully!");
    }).catch(err=>{
        res.status(500).json("Something went wrong!");
    });
}
// for admin
exports.orders = (req, res) => {
    Order.find().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: err || "Something went worng!",
        })
    });
};

