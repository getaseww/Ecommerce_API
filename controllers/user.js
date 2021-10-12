require('dotenv').config();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    // Validate request
    if (!(firstName || password || email)) {
        res.status(400).json({ message: "Fields can not be empty!" });
    }

    User.findOne({ email: email }).then(data => {
        if (data) {
            res.status(409).json({
                message: 'Email already Exists',
            });
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                password: hash,
                email: email,
            });

            user
                .save(user)
                .then(data => {
                    if (data) {
                        const token = jwt.sign({
                            id: user._id,
                            email: user.email
                        }, process.env.TOKEN_KEY, function (err, token) {
                            res.status(200).json({
                                token: token
                            });
                        });
                    } else {
                        res.status(500).json({
                            message: 'Something went wrong',
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message:
                            err.message || "Some error occurred while creating user."
                    });
                });
        }

    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });

};
exports.login = (req, res) => {
    const { email, password } = req.body;
    // Validate request
    if (!(password || email)) {
        res.status(400).json({ message: "Fields can not be empty!" });
    }

    User.findOne({email:email}).then(user=>{
        if(user){
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, process.env.TOKEN_KEY, function (err, token) {
                        res.status(200).json({
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        data: result,
                        message: 'Invalid password',
                    });
                }

            });
        }else{
            res.status(401).json({
                message:"Invalid email!"
            })
        }

    }).catch(err=>{
        res.status(500).json({
            message:"Something went wrong!",
        })
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "User not found  with the specified id " });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving user with id=" });
        });
};

exports.users = (req, res) => {
    User.find()
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

exports.delete=(req,res)=>{
    const userId=req.params.id;
    User.findByIdAndDelete(userId).then(data=>{res.status(200).json({message:"User deleted successfully!"})})
}