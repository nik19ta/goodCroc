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
const jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');});

app.post('/send', jsonParser, function (req, res) {
    console.log(req.body.login, req.body.password);
    let transporter = nodemailer.createTransport({
        host: "app.croc.ru",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: req.body.login, // generated ethereal user
            pass: req.body.password, // generated ethereal password
        },
    });   


    transporter.sendMail({
            from: 'bobriksbank@croc.ru', // sender address
            to: 'mosashvili_is18@st.ithub.ru', // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

});
app.listen(3000);
console.log('Startserv...');