import express, { Express } from 'express';
import 'dotenv/config';
import authRoutes from './modules/auth/auth.route';
import { errorHandler } from './common/middlewares/error-handler';
import cors from 'cors';
const app: Express = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
