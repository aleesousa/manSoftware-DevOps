const express = require('express');
const router = express.Router();
const { Indicacao, Professor, Aluno, Disciplina } = require('../models');

const include = [
  { model: Professor, as: 'professor', attributes: ['id', 'nome', 'email'] },
  { model: Aluno, as: 'aluno', attributes: ['id', 'nome', 'matricula'] },
  { model: Disciplina, as: 'disciplina', attributes: ['id', 'nome', 'codigo'] },
];

// GET /indicacoes
router.get('/', async (req, res) => {
  try {
    const indicacoes = await Indicacao.findAll({ include });
    res.json(indicacoes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar indicações', detalhe: err.message });
  }
});

// GET /indicacoes/:id
router.get('/:id', async (req, res) => {
  try {
    const indicacao = await Indicacao.findByPk(req.params.id, { include });
    if (!indicacao) return res.status(404).json({ erro: 'Indicação não encontrada' });
    res.json(indicacao);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar indicação', detalhe: err.message });
  }
});

// POST /indicacoes
router.post('/', async (req, res) => {
  try {
    const { professor_id, aluno_id, disciplina_id, justificativa } = req.body;
    if (!professor_id || !aluno_id || !disciplina_id) {
      return res.status(400).json({ erro: 'professor_id, aluno_id e disciplina_id são obrigatórios' });
    }

    // Verifica existência das FKs
    const [prof, aluno, disc] = await Promise.all([
      Professor.findByPk(professor_id),
      Aluno.findByPk(aluno_id),
      Disciplina.findByPk(disciplina_id),
    ]);
    if (!prof) return res.status(404).json({ erro: 'Professor não encontrado' });
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
    if (!disc) return res.status(404).json({ erro: 'Disciplina não encontrada' });

    const indicacao = await Indicacao.create({
      professor_id, aluno_id, disciplina_id, justificativa, status: 'pendente',
    });
    const result = await Indicacao.findByPk(indicacao.id, { include });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar indicação', detalhe: err.message });
  }
});

// PATCH /indicacoes/:id/status - atualizar status
router.patch('/:id/status', async (req, res) => {
  try {
    const indicacao = await Indicacao.findByPk(req.params.id);
    if (!indicacao) return res.status(404).json({ erro: 'Indicação não encontrada' });

    const { status } = req.body;
    const validos = ['pendente', 'aprovado', 'recusado'];
    if (!validos.includes(status)) {
      return res.status(400).json({ erro: `Status inválido. Use: ${validos.join(', ')}` });
    }
    await indicacao.update({ status });
    const result = await Indicacao.findByPk(indicacao.id, { include });
    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar status', detalhe: err.message });
  }
});

// DELETE /indicacoes/:id
router.delete('/:id', async (req, res) => {
  try {
    const indicacao = await Indicacao.findByPk(req.params.id);
    if (!indicacao) return res.status(404).json({ erro: 'Indicação não encontrada' });
    await indicacao.destroy();
    res.json({ mensagem: 'Indicação removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover indicação', detalhe: err.message });
  }
});

module.exports = router;
