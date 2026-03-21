import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PDF Generator API',
      version: '1.0.0',
      description: 'CV PDF generator microservice',
    },
    components: {
      schemas: {
        CVData: {
          type: 'object',
          required: ['name', 'lastname', 'email', 'phoneNumber', 'age', 'description', 'education'],
          properties: {
            name: { type: 'string' },
            lastname: { type: 'string' },
            email: { type: 'string' },
            phoneNumber: { type: 'string' },
            age: { type: 'string' },
            description: { type: 'string' },
            education: { type: 'array', items: { type: 'string' } },
            previousJobs: { type: 'array', items: { type: 'string' } },
            preferredJob: { type: 'string' },
            expectedSalary: { type: 'number' },
          },
        },
      },
    },
  },
  apis: ['./dist/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
