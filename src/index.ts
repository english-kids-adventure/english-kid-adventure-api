import express, { Express } from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoutes from '@modules/auth/auth.route';
import { errorHandler } from '@middlewares/error-handler.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import cors from 'cors';
import topicRoutes from '@modules/topics/topic.route';
const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth', authRoutes);
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
app.use('/api/v1/topics', topicRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
