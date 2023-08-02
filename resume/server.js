const express = require('express');
const cors = require('cors');

require('dotenv').config({debug:true});

const postmark = require('postmark');
const mail = new postmark.ServerClient(process.env.MAIL_ID);


const app = express();

app.use(express.static('resume'));
app.use(express.json())
app.use(cors())


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
});


app.post("/submit", (req, res) => {
    mail.sendEmail({
        From: process.env.FROM,
        To: process.env.EMAIL,
        Subject: req.body.subject,
        HtmlBody: `<h3> mail: <a href="${req.body.email}" </a></h3> <br> <h1> ${req.body.message} </h1>`,
        MessageStream: 'outbound'
    });
    res.status(200).send("success")
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
