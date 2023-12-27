import 'express-async-errors';
import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.route';

const app = express();

app.use(express.json());
app.use('/api/v1', userRouter);

export default app