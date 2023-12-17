const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { where } = require("sequelize");

//get users:

module.exports.getUsers = async function(req, res) {
    try {
        const users = await User.findAll();
        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(200).json({ message: 'No users found!' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getUser = async function(req,res){
    try{
        const {id} = req.params
        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({message: "User with ID does not exist!"});
        }
        const responseUser ={
            name: user.name,
            email: user.email
        }
        return res.status(200).json(responseUser);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}
//User registration: 
module.exports.register = async function(req,res){
    try{
        const {name, email, password} = req.body;
        
        const newUser = await User.create({name, email, password});
        res.status(201).json({message:"New user registered!"});

    }catch(error){
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = Object.keys(error.fields)[0];
            return res.status(400).json({ error: `${field} is already in use` });
        }
        console.log(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

//User login: 
module.exports.login = async function (req,res){
    try{
        const {email, password} = req.body;
        const user = await User.findOne({
            where:{ 
                email: email,
            },
        });

        if(user){
            if(user.password===password){
                return res.status(200).json({message:"Login Successful!"});
            }else{
                return res.status(401).json({message:"Unauthorized!"});
            }
        }
        else if(!user){
            return res.status(404).json("User not found!");
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

