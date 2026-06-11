const { Router } = require('express');
const Sala = require('../models/Sala');

const router = Router();

router.get('/', async (req, res) => {
  const salas = await Sala.findAll();
  res.json(salas);
});

router.get('/:id', async (req, res) => {
  const sala = await Sala.findByPk(req.params.id);

  if (!sala) {
    return res.status(404).json({ error: 'Sala não encontrada' });
  }

  res.json(sala);
});

router.post('/', async (req, res) => {
  const { nome, capacidade } = req.body;

  const sala = await Sala.create({
    nome,
    capacidade
  });

  res.status(201).json(sala);
});

router.put('/:id', async (req, res) => {
  const sala = await Sala.findByPk(req.params.id);

  if (!sala) {
    return res.status(404).json({ error: 'Sala não encontrada' });
  }

  await sala.update(req.body);

  res.json(sala);
});

router.delete('/:id', async (req, res) => {
  const sala = await Sala.findByPk(req.params.id);

  if (!sala) {
    return res.status(404).json({ error: 'Sala não encontrada' });
  }

  await sala.destroy();

  res.status(204).send();
});

module.exports = router;