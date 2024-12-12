const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const imageDir = 'C:/Users/Lenovo/Downloads/Picture'; // Replace with the path to your local images
const outputPdf = 'C:/Users/Lenovo/Downloads/Picture/report.pdf';

function createPdfFromImages() {
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(outputPdf);
  doc.pipe(writeStream);

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));

    imageFiles.forEach((file, index) => {
      const imagePath = path.join(imageDir, file);

      if (index > 0) {
        doc.addPage();
      }

      doc.image(imagePath, {
        fit: [500, 700],
        align: 'center',
        valign: 'center'
      });
    });

    doc.end();

    writeStream.on('finish', function() {
      console.log(`PDF created successfully: ${outputPdf}`);
    });
  });
}

createPdfFromImages();
