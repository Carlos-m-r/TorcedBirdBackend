import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

export function setupSwagger(app) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TorcedBird API',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], 
  };

  const swaggerSpec = swaggerJsdoc(options);

  // Ruta para JSON
  app.get('/api-docs/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Ruta para UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
