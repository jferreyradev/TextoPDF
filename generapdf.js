const PDFDocument = require('pdfkit');
const fs = require('fs');
const readLine = require('readline');
const path = require('path');

// Load PDF configuration
let pdfConfig;
try {
   const configPath = path.join(__dirname, 'pdf-config.json');
   pdfConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
   console.error('Error loading pdf-config.json, using default configuration:', err.message);
   // Default configuration if config file is not found
   pdfConfig = {
      document: { layout: 'landscape', size: 'A4', font: 'Courier', margin: 5 },
      text: { fontSize: 5.8 },
      logo: { path: './public/logo_dgs.png', x: 700, y: 10, width: 126, height: 31 },
      newPage: { layout: 'landscape', size: 'A4', font: 'Courier', margin: 10 }
   };
}

function genPDF(file, newDir) {
   console.log(file)
   const fileName = path.basename(file);
   console.log(path.join(newDir, fileName))
   console.log(file.split('.')[0] + '.pdf')
   const rl = readLine.createInterface({
      input: fs.createReadStream(file)
   });

   const pdfDoc = new PDFDocument({ 
      layout: pdfConfig.document.layout, 
      size: pdfConfig.document.size, 
      font: pdfConfig.document.font, 
      margin: pdfConfig.document.margin 
   });

   const filePDF = path.join(newDir, fileName);

   pdfDoc.pipe(fs.createWriteStream(filePDF.split('.')[0] + '.pdf'));

   pdfDoc.fontSize(pdfConfig.text.fontSize);

   rl.on('line', function (text) {
      if (text.includes('\f')) {
         pdfDoc.image(
            pdfConfig.logo.path, 
            pdfConfig.logo.x, 
            pdfConfig.logo.y, 
            { width: pdfConfig.logo.width, height: pdfConfig.logo.height }
         );
         pdfDoc.addPage({
            layout: pdfConfig.newPage.layout, 
            size: pdfConfig.newPage.size, 
            font: pdfConfig.newPage.font, 
            margin: pdfConfig.newPage.margin
         });
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