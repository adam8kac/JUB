import puppeteer from 'puppeteer';
import type { CVData } from '../models/CVData.js';
import { cvTemplate } from '../templates/cv.template.js';
import { CVService } from './cv.service.js';

export async function generateCvPdf(data: CVData): Promise<Buffer> {
  const html = cvTemplate(data);
  console.log(data);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  return Buffer.from(pdf);
}
