const express = require('express');
const router = express.Router();
const { Aluno } = require('../models');

// GET /alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar alunos', detalhe: err.message });
  }
});

// GET /alunos/:id
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar aluno', detalhe: err.message });
  }
});

// POST /alunos
router.post('/', async (req, res) => {
  try {
    const { nome, matricula, email, cr } = req.body;
    if (!nome || !matricula || !email) {
      return res.status(400).json({ erro: 'Nome, matrícula e e-mail são obrigatórios' });
    }
    const aluno = await Aluno.create({ nome, matricula, email, cr });
    res.status(201).json(aluno);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Matrícula ou e-mail já cadastrado' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ erro: err.errors.map(e => e.message) });
    }
    res.status(500).json({ erro: 'Erro ao criar aluno', detalhe: err.message });
  }
});

// PUT /alunos/:id
router.put('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
    const { nome, matricula, email, cr } = req.body;
    await aluno.update({ nome, matricula, email, cr });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar aluno', detalhe: err.message });
  }
});

// DELETE /alunos/:id
router.delete('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
    await aluno.destroy();
    res.json({ mensagem: 'Aluno removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover aluno', detalhe: err.message });
  }
});

module.exports = router;
