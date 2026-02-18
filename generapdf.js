const PDFDocument = require('pdfkit');
const fs = require('fs');
const readLine = require('readline');
const path = require('path');

// Load PDF configuration
function loadPDFConfig(configPath) {
   let pdfConfig;
   try {
      const resolvedPath = configPath || path.join(__dirname, 'pdf-config.json');
      pdfConfig = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
      console.log(`Using configuration from: ${resolvedPath}`);
   } catch (err) {
      if (configPath) {
         console.error(`Error loading config file from ${configPath}: ${err.message}`);
         console.error('Using default configuration');
      } else {
         console.log('pdf-config.json not found, using default configuration');
      }
      // Default configuration if config file is not found
      pdfConfig = {
         document: { layout: 'landscape', size: 'A4', font: 'Courier', margin: 5 },
         text: { fontSize: 5.8 },
         logo: { path: './public/logo_dgs.png', x: 700, y: 10, width: 126, height: 31 },
         newPage: { layout: 'landscape', size: 'A4', font: 'Courier', margin: 10 }
      };
   }
   return pdfConfig;
}

function genPDF(file, newDir, pdfConfig) {
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
   
   // Parse command-line arguments
   let directoryPath = null;
   let configPath = null;
   
   for (let i = 0; i < args.length; i++) {
      if (args[i] === '--config' || args[i] === '-c') {
         if (i + 1 < args.length) {
            configPath = args[i + 1];
            i++; // Skip the next argument
         } else {
            console.error('Error: --config/-c requires a file path argument');
            process.exit(1);
         }
      } else if (!directoryPath) {
         directoryPath = args[i];
      }
   }

   if (!directoryPath) {
      console.log("Debe especificar el directorio donde están los archivos a convertir.");
      console.log("Ejemplo:" + '\n');
      console.log("node generapdf.js <DirName>");
      console.log("node generapdf.js <DirName> --config custom-config.json");
      console.log("node generapdf.js <DirName> -c custom-config.json");
   } else {

      // Load configuration
      const pdfConfig = loadPDFConfig(configPath);

      const files = getFilesFromDir(directoryPath);

      if (files) {

         const folderName = path.join(directoryPath, 'pdf');
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
               genPDF(element, folderName, pdfConfig);
            }
         })
      }
   }



}

main();