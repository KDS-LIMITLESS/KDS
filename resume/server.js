const express = require('express');
const {google} = require('googleapis')
const cors = require('cors');

require('dotenv').config({debug:true});
const nodemailer = require('nodemailer')


const app = express();

app.use(express.static('resume'));
app.use(express.json())
app.use(cors())


//OAuth2 Configurations
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, 
    process.env.CLIENT_SECRET, process.env.REDIRECT_URL);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const access_token = oauth2Client.getAccessToken()


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
});


app.post("/submit", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_ID,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: access_token
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `${req.body.names} <${req.body.email}>`,
        to: process.env.EMAIL_ID,
        subject: req.body.subject,
        text: `<${req.body.email}>: \n \n ${req.body.message}`
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
