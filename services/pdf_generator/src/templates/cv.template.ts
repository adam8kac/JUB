import type { CVData } from '../models/CVData.js';

export function cvTemplate(data: CVData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        h1 { font-size: 28px; margin-bottom: 4px; text-align: center; }
        .preferred-job { text-align: center; font-size: 14px; color: #888; margin-bottom: 12px; }
        .contact-bar { display: flex; justify-content: center; gap: 24px; font-size: 13px; color: #555; margin-bottom: 32px; }
        h2 { font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-top: 24px; }
        ul { margin: 8px 0; padding-left: 20px; }
        li { margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <h1>${data.name} ${data.lastname}</h1>
      ${data.preferredJob ? `<div class="preferred-job">${data.preferredJob}</div>` : ''}
      <div class="contact-bar">
        <span>✉ ${data.email}</span>
        <span>☏ ${data.phoneNumber}</span>
        <span>${data.age} years old</span>
      </div>

      <h2>About Me</h2>
      <p>${data.description}</p>

      <h2>Education</h2>
      <ul>
        ${data.education.map((e) => `<li>${e}</li>`).join('')}
      </ul>

      ${
        data.previousJobs && data.previousJobs.length > 0
          ? `
      <h2>Work experience</h2>
      <ul>
        ${data.previousJobs.map((j) => `<li>${j}</li>`).join('')}
      </ul>`
          : `
          <h2>Work experience</h2>
          Don't have any
          `
      }
    </body>
    </html>
  `;
}
