var XLSX = require('xlsx')
var fs = require('fs')
var workbook = XLSX.readFile('Эко_боброшоп.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

for (let index = 0; index < xlData.length; index++) {
    console.log('Тавар: ' + xlData[index].goodName);
    console.log('Цена: ' + xlData[index].price);
    console.log('Имя: ' + xlData[index].userLastName + xlData[index].userFirstName);
    console.log('Почта: ' + xlData[index].userName + '@croc.ru');
    console.log('----');


}
