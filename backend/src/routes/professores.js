const express = require('express');
const router = express.Router();
const { Professor } = require('../models');

// GET /professores - listar todos
router.get('/', async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.json(professores);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar professores', detalhe: err.message });
  }
});

// GET /professores/:id - buscar por id
router.get('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
    res.json(professor);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar professor', detalhe: err.message });
  }
});

// POST /professores - criar
router.post('/', async (req, res) => {
  try {
    const { nome, email, departamento } = req.body;
    if (!nome || !email) return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios' });
    const professor = await Professor.create({ nome, email, departamento });
    res.status(201).json(professor);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'E-mail já cadastrado' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ erro: err.errors.map(e => e.message) });
    }
    res.status(500).json({ erro: 'Erro ao criar professor', detalhe: err.message });
  }
});

// PUT /professores/:id - atualizar
router.put('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
    const { nome, email, departamento } = req.body;
    await professor.update({ nome, email, departamento });
    res.json(professor);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar professor', detalhe: err.message });
  }
});

// DELETE /professores/:id - remover
router.delete('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
    await professor.destroy();
    res.json({ mensagem: 'Professor removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover professor', detalhe: err.message });
  }
});

module.exports = router;
