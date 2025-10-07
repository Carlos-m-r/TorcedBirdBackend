export function setupSwagger(app) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TorcedBird API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'Juan' },
              email: { type: 'string', example: 'juan@example.com' }
            },
            required: ['id', 'name', 'email']
          }
        }
      }
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], 
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.get('/api-docs/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
