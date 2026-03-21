export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'JUB Web Gateway',
    version: '1.0.0',
    description: 'API Gateway za spletnega odjemalca — enotna vstopna točka za vse mikrostoritve.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    // ─── HEALTH ───────────────────────────────────────────────
    '/health': {
      get: {
        tags: ['Gateway'],
        summary: 'Health check',
        responses: { '200': { description: 'OK' } },
      },
    },

    // ─── AUTH (candidate) ─────────────────────────────────────
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registracija kandidata',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Uspešno registriran' },
          '409': { description: 'Email že obstaja' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Prijava kandidata',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Vrne accessToken in refreshToken' },
          '401': { description: 'Napačni podatki' },
        },
      },
    },
    '/auth': {
      get: {
        tags: ['Auth'],
        summary: 'Seznam vseh kandidatov',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Lista kandidatov' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/auth/{id}': {
      get: {
        tags: ['Auth'],
        summary: 'Pridobi kandidata po ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Podatki kandidata' },
          '404': { description: 'Ni najden' },
        },
      },
      delete: {
        tags: ['Auth'],
        summary: 'Izbriši kandidata',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Uspešno izbrisan' },
          '404': { description: 'Ni najden' },
        },
      },
    },

    // ─── EMPLOYER ─────────────────────────────────────────────
    '/employer/register': {
      post: {
        tags: ['Employer'],
        summary: 'Registracija podjetja',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['companyRegistrationNumber', 'email', 'password'],
                properties: {
                  companyRegistrationNumber: { type: 'string', description: 'Matična številka' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Uspešno registrirano' },
          '404': { description: 'Podjetje ni v registru (OPSI)' },
          '409': { description: 'Podjetje je že registrirano' },
        },
      },
    },
    '/employer/login': {
      post: {
        tags: ['Employer'],
        summary: 'Prijava podjetja',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Vrne accessToken in refreshToken' },
          '401': { description: 'Napačni podatki' },
        },
      },
    },
    '/employer': {
      get: {
        tags: ['Employer'],
        summary: 'Seznam vseh podjetij',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'Lista podjetij' } },
      },
    },
    '/employer/{id}': {
      get: {
        tags: ['Employer'],
        summary: 'Pridobi podjetje po matični številki',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Podatki podjetja' },
          '404': { description: 'Ni najdeno' },
        },
      },
      delete: {
        tags: ['Employer'],
        summary: 'Izbriši podjetje',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Uspešno izbrisano' },
          '404': { description: 'Ni najdeno' },
        },
      },
    },

    // ─── CV (PDF Generator) ───────────────────────────────────
    '/cv/save/{uid}': {
      post: {
        tags: ['CV'],
        summary: 'Shrani CV',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', description: 'CVData objekt' } } },
        },
        responses: {
          '201': { description: 'CV shranjen' },
          '409': { description: 'CV že obstaja' },
        },
      },
    },
    '/cv/{uid}': {
      get: {
        tags: ['CV'],
        summary: 'Pridobi CV podatke (JSON)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'CV kot JSON' },
          '404': { description: 'Ni najden' },
        },
      },
      patch: {
        tags: ['CV'],
        summary: 'Posodobi CV',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          '200': { description: 'CV posodobljen' },
          '404': { description: 'Ni najden' },
        },
      },
      delete: {
        tags: ['CV'],
        summary: 'Izbriši CV',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '204': { description: 'CV izbrisan' },
          '404': { description: 'Ni najden' },
        },
      },
    },
    '/cv/{uid}/pdf': {
      get: {
        tags: ['CV'],
        summary: 'Prenesi CV kot PDF',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'PDF datoteka',
            content: { 'application/pdf': { schema: { type: 'string', format: 'binary' } } },
          },
        },
      },
    },

    // ─── HUB — CVs (public browsing) ─────────────────────────
    '/cvs': {
      get: {
        tags: ['Hub – CVs'],
        summary: 'Prebrskaj vse objavljene CVje',
        responses: { '200': { description: 'Lista CVjev' } },
      },
    },
    '/cvs/{uid}': {
      get: {
        tags: ['Hub – CVs'],
        summary: 'Pridobi podrobnosti CVja',
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Podatki CVja' },
          '404': { description: 'Ni najden' },
        },
      },
    },

    // ─── HUB — Jobs ──────────────────────────────────────────
    '/jobs': {
      get: {
        tags: ['Hub – Jobs'],
        summary: 'Prebrskaj razpise (javno)',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'workType', in: 'query', schema: { type: 'string' } },
          { name: 'location', in: 'query', schema: { type: 'string' } },
          { name: 'experienceLevel', in: 'query', schema: { type: 'string' } },
        ],
        responses: { '200': { description: 'Lista razpisov' } },
      },
      post: {
        tags: ['Hub – Jobs'],
        summary: 'Objavi nov razpis (employer)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          '201': { description: 'Razpis objavljen' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/jobs/{id}': {
      get: {
        tags: ['Hub – Jobs'],
        summary: 'Pridobi razpis',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Podatki razpisa' },
          '404': { description: 'Ni najden' },
        },
      },
      put: {
        tags: ['Hub – Jobs'],
        summary: 'Posodobi razpis (employer)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '200': { description: 'Posodobljeno' } },
      },
      delete: {
        tags: ['Hub – Jobs'],
        summary: 'Deaktiviraj razpis (employer)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Deaktivirano' } },
      },
    },

    // ─── HUB — Inbox & Requests ───────────────────────────────
    '/requests': {
      post: {
        tags: ['Hub – Inbox'],
        summary: 'Pošlji sporočilo / povpraševanje',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          '201': { description: 'Zahteva poslana' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/requests/{id}': {
      patch: {
        tags: ['Hub – Inbox'],
        summary: 'Odgovori na zahtevo (sprejmi / zavrni)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '200': { description: 'Odgovor shranjen' } },
      },
    },
    '/inbox/{userId}': {
      get: {
        tags: ['Hub – Inbox'],
        summary: 'Pridobi inbox uporabnika',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Lista sporočil' } },
      },
    },

    // ─── HUB — Notifications (SSE) ───────────────────────────
    '/notifications/stream/{userId}': {
      get: {
        tags: ['Hub – Notifications'],
        summary: 'Naroči se na real-time obvestila (SSE)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'Server-Sent Events stream',
            content: { 'text/event-stream': { schema: { type: 'string' } } },
          },
        },
      },
    },
  },
};
