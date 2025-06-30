import fs from 'fs';
import path from 'path';
import { logToTerminal } from '../cypress/support/logger';

export class FileUtils {
  static cleanInvoiceFolder(): string {
    try {
      const baseDir = path.resolve(__dirname, '..', 'cypress', 'fixtures');
      const invoiceDir = path.join(baseDir, 'invoice');
      const archiveDir = path.join(baseDir, 'invoiceArchive');

      if (!fs.existsSync(invoiceDir)) {
        throw new Error(`Invoice directory not found: ${invoiceDir}`);
      }

      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir);
      }

      const pdfFiles = fs.readdirSync(invoiceDir)
        .filter(file => file.toLowerCase().endsWith('.pdf'))
        .map(file => ({
          name: file,
          path: path.join(invoiceDir, file),
          mtime: fs.statSync(path.join(invoiceDir, file)).mtime.getTime()
        }));

      if (pdfFiles.length === 0) {
        throw new Error(`Invoice directory is empty. No PDF files found.`);
      }

      if (pdfFiles.length === 1) {
        return `No cleanup needed. Only 1 PDF file present: ${pdfFiles[0].name}`;
      }

      pdfFiles.sort((a, b) => b.mtime - a.mtime);
      const [latestFile, ...olderFiles] = pdfFiles;

      olderFiles.forEach(file => {
        const destination = path.join(archiveDir, file.name);
        fs.renameSync(file.path, destination);
      });

      return `Moved ${olderFiles.length} old file(s) to archive. Kept latest: ${latestFile.name}`;
    } catch (error: any) {
      return ` Error in cleanInvoiceFolder: ${error.message}`;
    }
  }

  static getLatestInvoiceFileName(): string {
    try {
      const invoiceDir = path.resolve(__dirname, '..', 'cypress', 'fixtures', 'invoice');

      if (!fs.existsSync(invoiceDir)) {
        throw new Error(`Invoice directory not found: ${invoiceDir}`);
      }

      const pdfFiles = fs.readdirSync(invoiceDir)
        .filter(file => file.toLowerCase().endsWith('.pdf'))
        .map(file => ({
          name: file,
          path: path.join(invoiceDir, file),
          mtime: fs.statSync(path.join(invoiceDir, file)).mtime.getTime()
        }));

      if (pdfFiles.length === 0) {
        throw new Error(`No PDF files found in invoice directory.`);
      }

      pdfFiles.sort((a, b) => b.mtime - a.mtime);
      return pdfFiles[0].name;
    } catch (error: any) {
      return ` Error in getLatestInvoiceFileName: ${error.message}`;
    }
  }
}
