const nodemailer = require("nodemailer");
const XLSX = require('xlsx')
const fs = require('fs')
const workbook = XLSX.readFile('Эко_боброшоп.xlsx');
const sheet_name_list = workbook.SheetNames;
const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1654, 2339)
const ctx = canvas.getContext('2d')
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send', jsonParser, function (req, res) {
    console.log(req.body.login, req.body.password);
    let transporter = nodemailer.createTransport({
        host: "SMTP.Office365.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: req.body.login, // generated ethereal user
            pass: req.body.password, // generated ethereal password
        },
    });   


    transporter.sendMail({
            from: req.body.login, // sender address
            to: "nikhvatov19@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

})
app.listen(3000);







// let errors = [];

// function send(goods, name, email, file) {

//     try {
//         console.log(goods, name, email, file);
//         /// code ....
//         // transporter.sendMail({
//         //     from: '"Fred Foo 👻" <btza2dlbiyqfl5rs@ethereal.email> ', // sender address
//         //     to: "nikhvatov19@gmail.com", // list of receivers
//         //     subject: "Hello ✔", // Subject line
//         //     text: "Hello world?", // plain text body
//         //     html: "<b>Hello world?</b>", // html body
//         // });
        
//     } catch (error) {
//         errors.push({
//             "name":name,
//             "email": email,
//             "goods": goods
//         })
//         console.log(`Не удалось отправить письмо на почту ${email} `);
//         fs.writeFileSync(`./error.json`, JSON.stringify(errors))
//     }
// }



// for (let index = 0; index < xlData.length; index++) {

//     // send(
//     //     xlData[index].goodName,
//     //     `${xlData[index].userLastName} ${xlData[index].userFirstName}`, 
//     //     `${xlData[index].userName}@croc.ru` , 
//     //     'file...'
//     //     )
// }
    
// function createImg() {
//     loadImage('./croc.jpg').then((image) => {
//         ctx.drawImage(image, 0, 0, 1654, 2339)
//         ctx.font = 'bold 92px Croc'
//         ctx.rotate(0)
//         ctx.fillText(`Мосашвили Александр`, 135, 1150)
//         fs.writeFileSync('index.html', `<!DOCTYPE html >
//         <html lang="en">
//         <head>
//         <title>Document</title>
//         </head>
//         <body>
//         <img src="${canvas.toDataURL()}" />
//         </body >
//         </html >`)
//     })
// }

// createImg()
