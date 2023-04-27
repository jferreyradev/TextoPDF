const PDFDocument = require('pdfkit');
const fs = require('fs');
const readLine = require('readline');
const path = require('path');

function genPDF(file) {
   const rl = readLine.createInterface({
      input: fs.createReadStream(file)
      /*output : process.stdout,
      terminal: false*/
   });

   const pdfDoc = new PDFDocument({ layout: 'landscape', size: 'A4', font: 'Courier', margin: 5 });

   pdfDoc.pipe(fs.createWriteStream(file.split('.')[0] + '.pdf'));

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
      //console.error(err);
      console.error("No existe el directorio de entrada");
   }
}


function main() {

   const args = process.argv.slice(2);

   /*const folderName = './output';

   try {
      if (!fs.existsSync(folderName)) {
         fs.mkdirSync(folderName);
      }
   } catch (err) {
      console.error(err);
   }
   */

   if (!args[0]) {
      console.log("Debe especificar el directorio donde están los archivos a convertir.");
      console.log("Ejemplo:" + '\n');
      console.log("node generapdf.js <<DirName>>");
   } else {

      const files = getFilesFromDir(args[0]);

      if (files) {
         files.forEach(element => {
            if (path.extname(element) === ".txt") {
               console.log("Procesando: " + element);
               genPDF(element);
            }
         })
      }
   }

   //console.log(getFilesFromDir(args[0]));
   /*
   args.forEach(el => {
      genPDF(el);
   });
   */

}

main();