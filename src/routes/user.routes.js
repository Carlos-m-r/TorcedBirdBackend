import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones sobre usuarios
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       409:
 *         description: Usuario ya existe
 *       500:
 *         description: Error interno
 */
router.post('/', createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener el usuario autenticado
 *     description: Retorna la información del usuario actual a partir del token JWT.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []        # Requiere autenticación por JWT
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado o token inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authMiddleware, getUser);


/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Actualizar parcialmente un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - modifiedData
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               modifiedData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 *       409:
 *         description: Datos duplicados
 *       500:
 *         description: Error interno
 */
router.patch('/', authMiddleware, updateUser);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno
 */
router.delete('/', authMiddleware, deleteUser);

export default router;
