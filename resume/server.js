const express = require('express');
const nodemailer = require('nodemailer');
require ("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});


// nodemailer

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

// confirm connection to nodemailer
 
transporter.verify((error, success) =>{
    if(error){
        console.log(error)
    }else{
        console.log('Server ready!')
    };
});

module.exports = transporter


