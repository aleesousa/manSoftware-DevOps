const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./models');

const professoresRoutes = require('./routes/professores');
const alunosRoutes = require('./routes/alunos');
const disciplinasRoutes = require('./routes/disciplinas');
const indicacoesRoutes = require('./routes/indicacoes');

const app = express();

app.use(express.json());

// Rotas da API
app.use('/professores', professoresRoutes);
app.use('/alunos', alunosRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/indicacoes', indicacoesRoutes);

// Swagger UI (gerado após rodar swagger.js)
try {
  const swaggerOutput = require('../swagger-output.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
} catch {
  app.get('/docs', (req, res) => res.send('Execute "node src/swagger.js" para gerar a documentação.'));
}

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Monitoria de Alunos - online', docs: '/docs' });
});

// Erro 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Sincroniza banco e sobe servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco:', err.message);
    process.exit(1);
  });

module.exports = app;
