import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './Routers/UserRoutes.js';
import MoviesRouter from './Routers/MoviesRoutes.js';
import CategoriesRouter from './Routers/CategoriesRouter.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/connectDB.js';
import Uploadrouter from './Controller/uploadFile.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// conncetc db
connectDB();

//mainRouter
app.get('/', (req, res) => {
  res.send('API is running....');
});
// otherRouter
app.use('/api/users', userRouter);
app.use('/api/movies', MoviesRouter);
app.use('/api/categories', CategoriesRouter);
app.use('/api/upload', Uploadrouter);

// error handler message
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
