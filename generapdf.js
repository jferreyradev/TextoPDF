const PDFDocument = require('pdfkit');
const fs = require('fs');
const readLine = require('readline');
const path = require('path');

function genPDF(file, newDir) {
   console.log(file)
   console.log(path.join(newDir, file.split("\\")[1]))
   console.log(file.split('.')[0] + '.pdf')
   const rl = readLine.createInterface({
      input: fs.createReadStream(file)
   });

   const pdfDoc = new PDFDocument({ layout: 'landscape', size: 'A4', font: 'Courier', margin: 5 });

   const filePDF=(path.join(newDir, file.split("\\")[1]));

   pdfDoc.pipe(fs.createWriteStream(filePDF.split('.')[0] + '.pdf'));

   pdfDoc.fontSize(5.8);

   rl.on('line', function (text) {
      if (text.includes('\f')) {
         pdfDoc.image('./public/logo_dgs.png', 700, 10, { width: 126, height: 31 });
         pdfDoc.addPage(
            { layout: 'landscape', size: 'A4', font: 'Courier', margin: 10 }
         );
      }
      pdfDoc.text(text);
   });

   rl.on('close', () => {
      pdfDoc.end();
   });
}

function getFilesFromDir(folderPath) {

   try {
      const isFile = fileName => {
         return fs.lstatSync(fileName).isFile();
      };

      return fs.readdirSync(folderPath).map(fileName => {
         return path.join(folderPath, fileName);
      }).filter(isFile);

   } catch (err) {

      console.error("No existe el directorio de entrada", err);
   }
}


function main() {

   const args = process.argv.slice(2);


   if (!args[0]) {
      console.log("Debe especificar el directorio donde están los archivos a convertir.");
      console.log("Ejemplo:" + '\n');
      console.log("node generapdf.js <<DirName>>");
   } else {

      const files = getFilesFromDir(args[0]);

      if (files) {

         const folderName = path.join(args[0], 'pdf');
         console.log('----FOLDER---'+folderName)
         try {
            if (!fs.existsSync(folderName)) {
               fs.mkdirSync(folderName);
            }
         } catch (err) {
            console.error(err);
         }

         files.forEach(element => {
            if (path.extname(element) === ".txt") {
               console.log("Procesando: " + element);
               genPDF(element, folderName);
            }
         })
      }
   }



}

main();