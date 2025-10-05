import app from './app.js';
import { connectDB } from './services/mongo.service.js';
import { setupSwagger } from './config/swagger.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    setupSwagger(app);
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('No se pudo arrancar el servidor:', error);
  }
}

startServer();