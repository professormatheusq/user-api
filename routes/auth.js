const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config');
const auth = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Email já cadastrado ou dados inválidos
 */
router.post('/register', validateRegistration, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ 
      id: user.id, 
      email: user.email,
      token 
    });
  } catch (e) {
    res.status(400).json({ error: 'Email já cadastrado' });
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
  res.json({ 
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
});

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Obtém dados do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *       401:
 *         description: Não autorizado
 */
router.get('/me', auth, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'email']
  });
  res.json(user);
});

/**
 * @swagger
 * /api/me:
 *   put:
 *     summary: Atualiza dados do usuário
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *       401:
 *         description: Não autorizado
 */
router.put('/me', auth, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByPk(req.user.id);
  
  if (email) user.email = email;
  if (password) user.password = password;
  
  await user.save();
  res.json({ 
    id: user.id, 
    email: user.email 
  });
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/users/:id', auth, async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.json({ message: 'Usuário deletado' });
});

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Realiza logout do usuário
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
