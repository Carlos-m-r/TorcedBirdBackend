import express from 'express';
import { createUserConfig, getUserConfig, updateUserConfig, deleteUserConfig } from '../controllers/user.config.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserConfigs
 *   description: Operaciones sobre configuraciones de usuario
 */

/**
 * @swagger
 * /user-configs:
 *   post:
 *     summary: Crear una nueva configuración de usuario
 *     tags: [UserConfigs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - settings
 *             properties:
 *               userId:
 *                 type: string
 *               settings:
 *                 type: object
 *     responses:
 *       201:
 *         description: Configuración creada
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno
 */
router.post('/', createUserConfig);

/**
 * @swagger
 * /user-configs:
 *   get:
 *     summary: Obtener todas las configuraciones de usuario
 *     tags: [UserConfigs]
 *     responses:
 *       200:
 *         description: Lista de configuraciones
 *       500:
 *         description: Error interno
 */
router.get('/', getUserConfig);

/**
 * @swagger
 * /user-configs:
 *   patch:
 *     summary: Actualizar una configuración de usuario
 *     tags: [UserConfigs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - modifiedData
 *             properties:
 *               id:
 *                 type: string
 *               modifiedData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Configuración actualizada
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error interno
 */
router.patch('/', updateUserConfig);

/**
 * @swagger
 * /user-configs:
 *   delete:
 *     summary: Eliminar una configuración de usuario
 *     tags: [UserConfigs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Configuración eliminada
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error interno
 */
router.delete('/', deleteUserConfig);

export default router;
