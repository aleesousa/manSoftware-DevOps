const express = require('express');
const router = express.Router();
const { Disciplina } = require('../models');

// GET /disciplinas
router.get('/', async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.json(disciplinas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar disciplinas', detalhe: err.message });
  }
});

// GET /disciplinas/:id
router.get('/:id', async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) return res.status(404).json({ erro: 'Disciplina não encontrada' });
    res.json(disciplina);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar disciplina', detalhe: err.message });
  }
});

// POST /disciplinas
router.post('/', async (req, res) => {
  try {
    const { nome, codigo, carga_horaria } = req.body;
    if (!nome || !codigo) return res.status(400).json({ erro: 'Nome e código são obrigatórios' });
    const disciplina = await Disciplina.create({ nome, codigo, carga_horaria });
    res.status(201).json(disciplina);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Código já cadastrado' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ erro: err.errors.map(e => e.message) });
    }
    res.status(500).json({ erro: 'Erro ao criar disciplina', detalhe: err.message });
  }
});

// PUT /disciplinas/:id
router.put('/:id', async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) return res.status(404).json({ erro: 'Disciplina não encontrada' });
    const { nome, codigo, carga_horaria } = req.body;
    await disciplina.update({ nome, codigo, carga_horaria });
    res.json(disciplina);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar disciplina', detalhe: err.message });
  }
});

// DELETE /disciplinas/:id
router.delete('/:id', async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) return res.status(404).json({ erro: 'Disciplina não encontrada' });
    await disciplina.destroy();
    res.json({ mensagem: 'Disciplina removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover disciplina', detalhe: err.message });
  }
});

module.exports = router;
