import express from 'express';
import { createFurniture, getFurniture, updateFurniture, deleteFurniture } from '../controllers/furniture.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Furniture
 *   description: Operaciones sobre muebles
 */

/**
 * @swagger
 * /furniture:
 *   post:
 *     summary: Crear un nuevo mueble
 *     tags: [Furniture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reference
 *               - name
 *               - room
 *               - type
 *               - measurement
 *               - description
 *             properties:
 *               reference:
 *                 type: string
 *               name:
 *                 type: string
 *               room:
 *                 type: string
 *               type:
 *                 type: string
 *               measurement:
 *                 type: array
 *                 items:
 *                   type: number
 *               description:
 *                 type: string
 *               material:
 *                 type: string
 *               price:
 *                 type: number
 *               color:
 *                 type: string
 *               image:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Mueble creado
 *       409:
 *         description: Mueble ya existe
 *       500:
 *         description: Error interno
 */
router.post('/', createFurniture);

/**
 * @swagger
 * /furniture:
 *   get:
 *     summary: Obtener todos los muebles
 *     tags: [Furniture]
 *     responses:
 *       200:
 *         description: Lista de muebles
 *       500:
 *         description: Error interno
 */
router.get('/', getFurniture);

/**
 * @swagger
 * /furniture:
 *   patch:
 *     summary: Actualizar un mueble
 *     tags: [Furniture]
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
 *                 properties:
 *                   reference:
 *                     type: string
 *                   name:
 *                     type: string
 *                   room:
 *                     type: string
 *                   type:
 *                     type: string
 *                   measurement:
 *                     type: array
 *                     items:
 *                       type: number
 *                   description:
 *                     type: string
 *                   material:
 *                     type: string
 *                   price:
 *                     type: number
 *                   color:
 *                     type: string
 *                   image:
 *                     type: string
 *                   active:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: Mueble actualizado
 *       404:
 *         description: Mueble no encontrado
 *       500:
 *         description: Error interno
 */
router.patch('/', updateFurniture);

/**
 * @swagger
 * /furniture:
 *   delete:
 *     summary: Eliminar un mueble
 *     tags: [Furniture]
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
 *         description: Mueble eliminado
 *       404:
 *         description: Mueble no encontrado
 *       500:
 *         description: Error interno
 */
router.delete('/', deleteFurniture);

export default router;
