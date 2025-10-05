import express from 'express';
import userRoutes from './routes/user.routes.js';
import furnitureRoutes from './routes/furniture.routes.js';
import authRoutes from "./routes/auth.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import UserConfigRoutes from "./routes/user.conf.routes.js";

const app = express();

// app.js (Express)
import cors from 'cors';
app.use(cors());


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/furniture', furnitureRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/user-config', UserConfigRoutes);


export default app;
