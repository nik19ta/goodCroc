const nodemailer = require("nodemailer");
const XLSX = require('xlsx')
const fs = require('fs')
const workbook = XLSX.readFile('Эко_боброшоп.xlsx');
const sheet_name_list = workbook.SheetNames;
const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1654, 2339)
const ctx = canvas.getContext('2d')

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'btza2dlbiyqfl5rs@ethereal.email', // generated ethereal user
        pass: 'McfMFjyrnXxq6sQkCJ', // generated ethereal password
    },
});

let errors = [];

function send(goods, name, email, file) {

    try {
        console.log(goods, name, email, file);
        /// code ....
        // transporter.sendMail({
        //     from: '"Fred Foo 👻" <btza2dlbiyqfl5rs@ethereal.email> ', // sender address
        //     to: "nikhvatov19@gmail.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });
        
    } catch (error) {
        errors.push({
            "name":name,
            "email": email,
            "goods": goods
        })
        console.log(`Не удалось отправить письмо на почту ${email} `);
        fs.writeFileSync(`./error.json`, JSON.stringify(errors))
    }
}



for (let index = 0; index < xlData.length; index++) {

    // send(
    //     xlData[index].goodName,
    //     `${xlData[index].userLastName} ${xlData[index].userFirstName}`, 
    //     `${xlData[index].userName}@croc.ru` , 
    //     'file...'
    //     )
}
    
function createImg() {
    loadImage('./croc.jpg').then((image) => {
        ctx.drawImage(image, 0, 0, 1654, 2339)
        ctx.font = 'bold 92px Croc'
        ctx.rotate(0)
        ctx.fillText(`Мосашвили Александр`, 135, 1150)
        fs.writeFileSync('index.html', `<!DOCTYPE html >
        <html lang="en">
        <head>
        <title>Document</title>
        </head>
        <body>
        <img src="${canvas.toDataURL()}" />
        </body >
        </html >`)
    })
}

createImg()
