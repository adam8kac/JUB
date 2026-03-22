import type { CVData } from '../models/CVData.js';

export function cvTemplate(data: CVData): string {
  const info = data.personalInfo ?? {};
  const fullName = `${info.firstName ?? ''} ${info.lastName ?? ''}`.trim() || 'Kandidat';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 48px; color: #1f2937; font-size: 14px; line-height: 1.5; }
        h1 { font-size: 26px; font-weight: 700; margin-bottom: 6px; }
        .contact-bar { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #6b7280; margin-bottom: 28px; }
        h2 { font-size: 15px; font-weight: 700; color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 4px; margin: 24px 0 12px; text-transform: uppercase; letter-spacing: 0.05em; }
        .summary { color: #374151; }
        .entry { margin-bottom: 14px; }
        .entry-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .entry-title { font-weight: 600; color: #111827; }
        .entry-sub { font-size: 13px; color: #4f46e5; margin-top: 2px; }
        .entry-date { font-size: 12px; color: #9ca3af; white-space: nowrap; }
        .entry-desc { font-size: 13px; color: #6b7280; margin-top: 6px; }
        .skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill { background: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; }
      </style>
    </head>
    <body>
      <h1>${fullName}</h1>
      <div class="contact-bar">
        ${info.email ? `<span>✉ ${info.email}</span>` : ''}
        ${info.phone ? `<span>☏ ${info.phone}</span>` : ''}
        ${info.location ? `<span>📍 ${info.location}</span>` : ''}
        ${info.linkedIn ? `<span>in ${info.linkedIn}</span>` : ''}
        ${info.website ? `<span>🌐 ${info.website}</span>` : ''}
      </div>

      ${data.summary ? `
      <h2>O meni</h2>
      <p class="summary">${data.summary}</p>
      ` : ''}

      ${data.skills && data.skills.length > 0 ? `
      <h2>Veščine</h2>
      <div class="skills">
        ${data.skills.map(s => `<span class="skill">${s}</span>`).join('')}
      </div>
      ` : ''}

      ${data.experience && data.experience.length > 0 ? `
      <h2>Delovne izkušnje</h2>
      ${data.experience.map(exp => `
        <div class="entry">
          <div class="entry-header">
            <div>
              <div class="entry-title">${exp.position}</div>
              <div class="entry-sub">${exp.company}</div>
            </div>
            <span class="entry-date">${exp.startDate} – ${exp.current ? 'Zdaj' : (exp.endDate || '')}</span>
          </div>
          ${exp.description ? `<div class="entry-desc">${exp.description}</div>` : ''}
        </div>
      `).join('')}
      ` : ''}

      ${data.education && data.education.length > 0 ? `
      <h2>Izobrazba</h2>
      ${data.education.map(edu => `
        <div class="entry">
          <div class="entry-header">
            <div>
              <div class="entry-title">${edu.institution}</div>
              <div class="entry-sub">${edu.degree}${edu.field ? `, ${edu.field}` : ''}</div>
            </div>
            <span class="entry-date">${edu.startDate} – ${edu.current ? 'Zdaj' : (edu.endDate || '')}</span>
          </div>
        </div>
      `).join('')}
      ` : ''}

    </body>
    </html>
  `;
}
