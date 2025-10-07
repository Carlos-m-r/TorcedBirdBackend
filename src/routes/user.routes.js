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
 *               - mail
 *             properties:
 *               name:
 *                 type: string
 *               mail:
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
 *       - bearerAuth: []        # indica que este endpoint requiere autenticación
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6512f72b45a8c34d29a4e2b7
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *                 name:
 *                   type: string
 *                   example: Juan
 *                 surname:
 *                   type: string
 *                   example: Pérez
 *                 phone:
 *                   type: string
 *                   example: "+541112345678"
 *                 shippingAddress:
 *                   type: string
 *                   example: "Calle Falsa 123, Ciudad"
 *                 admin:
 *                   type: boolean
 *                   example: true
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
 *               - mail
 *               - modifiedData
 *             properties:
 *               name:
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
 *               - name
 *               - mail
 *             properties:
 *               name:
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
