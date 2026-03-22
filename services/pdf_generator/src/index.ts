import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config.js';
import appRoutes from './routes/pdf.route.js';

const app = express();
app.use(express.json());

const PORT = process.env['PORT'] ?? 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', appRoutes);
app.use('/', appRoutes);

app.listen(PORT, () => {
  console.log(`pdf_generator running on port ${PORT}`);
  console.log(`docs: http://localhost:${PORT}/api-docs`);
});
