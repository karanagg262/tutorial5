const crypto = require("crypto");
const { json } = require("express");
const express = require('express');
const { send } = require("process");
const router = express.Router();

var users = [
    {
        "email" : "abc@abc.ca",
        "firstName" : "ABC",
        "id" : "5abf6783"
    },
    {
        "email" : "xyz@xyz.ca",
        "firstName": "XYZ",
        "id" : "5abf674563"
    },
]

router.get('/users', (req, res) => {
    if(users.length>0){
        res.status(200).json({
            message:"Users retrieved",
            success: true,
            users:users
        })
    }
    else {
        res.status(500).json({
            message: "Please add users"
        })
    }

})

router.post('/add', (req, res) => {
    const input = req.body;
    if(input.email && input.firstName){
        id = crypto.randomBytes(4).toString("hex");
        const data = {
            "email" : input.email,
            "firstName" : input.firstName,
            "id" : id
        }
        users.push(data)
        res.status(201).json({
            message: "User added", 
            success: true
        })
    }
    else {
        res.status(500).json({
            message: "Error"
        })
    }
})

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    const data = users.find(d => d.id===id);
    if(data && input.email && input.firstName){
        data.email = input.email;
        data.firstName = input.firstName;
        res.status(201).json({
            message: "User updated", 
            success: true
        })
    } else {
        res.status(500).json({
            message: "Error"
        })
    }
})

router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const data = users.find(d => d.id===id);
    if(data){
        res.status(200).json({
            success: true,
            user:data
        })
    } else {
        res.status(500).json({
            message: "Error"
        })
    }
})

module.exports = router