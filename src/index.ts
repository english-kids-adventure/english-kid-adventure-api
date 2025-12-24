import express, { Express } from 'express';
import 'dotenv/config';
import authRoutes from '@modules/auth/auth.route';
import { errorHandler } from '@middlewares/error-handler.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import cors from 'cors';
const app: Express = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
