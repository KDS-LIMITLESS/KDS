const router = require('express').Router();
const multiparty = require("multiparty");
const transporter = require('../server').transporter;

// send mail logic 
router.post("/send", (res, req) => {
    let form = new multiparty.form();
    let data = {};

    form.parse(req, function(err, fields){
        if(err){console.log(err)}

        else{console.log(fields)};
        // Object.keys(fields).forEach(function (property){
        //     data[property] = fields[property].toString();
        // });
        const mail = {
            from: data.contactName,
            to: process.env.EMAIL,
            subject: data.contactSubject,
            text: `${data.contactName} <${data.contactEmail}> \n${data.contactMessage}`,
        };

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("something went wrong")
            }else{
                res.status(200).send("Email sent!")
            }
        });
    });
    
})