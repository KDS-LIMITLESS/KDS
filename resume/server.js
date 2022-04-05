const express = require('express');


require('dotenv').config({debug:true});
const nodemailer = require('nodemailer')


const app = express();

app.use(express.static('resume'));
app.use(express.json())


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
});


app.post("/submit", (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASS
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_ID,
        subject: req.body.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.send(error);
        }else{
            console.log('Email sent ' + info.response);
            res.send('success')
        }
    })
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});
