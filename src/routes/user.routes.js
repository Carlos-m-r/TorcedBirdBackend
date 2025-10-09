import express from 'express';
import { createUser, getUser, updateUser, deleteUser, updatePasswordController } from '../controllers/user.controller.js';
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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "652a2c98f7e01f001e6b2d11"
 *         email:
 *           type: string
 *           example: "usuario@correo.com"
 *         name:
 *           type: string
 *           example: "Juan"
 *         surname:
 *           type: string
 *           example: "Pérez"
 *         phone:
 *           type: string
 *           example: "+34123456789"
 *         shippingAddress:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "Calle Mayor 10"
 *               postalCode:
 *                 type: string
 *                 example: "28013"
 *               city:
 *                 type: string
 *                 example: "Madrid"
 *         paymentMethod:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Visa"
 *               number:
 *                 type: string
 *                 example: "**** **** **** 4242"
 *               expiration:
 *                 type: string
 *                 example: "12/26"
 *         additionalData:
 *           type: string
 *           example: "Cliente VIP con descuento permanente"
 *         admin:
 *           type: boolean
 *           example: false
 *         active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               phone:
 *                 type: string
 *               shippingAddress:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                     postalCode:
 *                       type: string
 *                     city:
 *                       type: string
 *               paymentMethod:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     number:
 *                       type: string
 *                     expiration:
 *                       type: string
 *               additionalData:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - modifiedData
 *             properties:
 *               email:
 *                 type: string
 *               modifiedData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 *     summary: Desactivar un usuario (borrado lógico)
 *     description: Cambia el estado del usuario a inactivo (active = false) en lugar de eliminarlo.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario desactivado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error desactivando usuario
 */
router.delete('/', authMiddleware, deleteUser);


/**
 * @swagger
 * /users/password:
 *   patch:
 *     summary: Actualizar contraseña del usuario
 *     description: Permite al usuario autenticado actualizar su contraseña actual
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - passwordActual
 *               - passwordNueva
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@correo.com"
 *               passwordActual:
 *                 type: string
 *                 example: "123456"
 *               passwordNueva:
 *                 type: string
 *                 example: "nueva123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error de validación o contraseña incorrecta
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/password', authMiddleware, updatePasswordController);

export default router;
