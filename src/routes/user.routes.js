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
 *               - nombre
 *               - mail
 *               - age
 *             properties:
 *               nombre:
 *                 type: string
 *               mail:
 *                 type: string
 *               age:
 *                 type: integer
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
 *     summary: Obtener un usuario por nombre y mail
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: mail
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno
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
 *               - nombre
 *               - mail
 *               - modifiedData
 *             properties:
 *               nombre:
 *                 type: string
 *               mail:
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
 *               - nombre
 *               - mail
 *             properties:
 *               nombre:
 *                 type: string
 *               mail:
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
