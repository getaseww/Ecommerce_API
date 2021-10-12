const Product = require("../models/Product");


exports.create = (req, res) => {
  const { title, desc, img, categories, price } = req.body;
  // Validate request
  if (!(title || desc || img || categories || price)) {
    res.status(400).json({ message: "Fields can not be empty!" });
  }

  const product = new Product({
    title: title,
    desc: desc,
    img: img,
    categories: categories,
    price: price,
  });

  product.save(product)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating product."
      });
    });
};

exports.myProducts = (req, res) => {
  Product.find({userId:req.parmas.Id})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { title, desc, img, categories, price } = req.body;
  if (!(title || desc || img || categories || price)) {
    res.status(400).json("All fields are required to be updated!");
  }
  Product.findByIdAndUpdate(id,
    {
      title: title,
      desc: desc,
      categories: categories,
      price: price,
      img: img,
    },
    { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update product with id=${id}. Maybe product was not found!`
        });
      } else res.status(200).json({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating Product with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.status(200).json({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};


// for admin
exports.products = (req, res) => {
  Product.find()
    .then(data => {
      res.status(200).json(data);
    }).catch(err => {
      res.status(500).json({
        message: err || "Something went worng!",
      })
    });
};