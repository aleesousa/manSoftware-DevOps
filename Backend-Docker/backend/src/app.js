require('dotenv').config();

const express = require('express');
const sequelize = require('./database');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

require('./models/Reserva'); // registra as associações

const salasRouter = require('./routes/salas');
const solicitantesRouter = require('./routes/solicitantes');
const reservasRouter = require('./routes/reservas');

const app = express();

app.use(express.json());

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

app.use('/salas', salasRouter);
app.use('/solicitantes', solicitantesRouter);
app.use('/reservas', reservasRouter);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Servidor na porta ${PORT}`)
    );
  })
  .catch(err =>
    console.error('Erro ao conectar:', err)
  );