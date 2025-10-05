import express from 'express';
import { createPurchase, getPurchase, updatePurchase, deletePurchase } from '../controllers/purchase.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Operaciones sobre compras
 */

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - furnitureId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               furnitureId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Compra creada
 *       404:
 *         description: Usuario o mueble no encontrado
 *       500:
 *         description: Error interno
 */
router.post('/', createPurchase);

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Purchases]
 *     responses:
 *       200:
 *         description: Lista de compras
 *       500:
 *         description: Error interno
 */
router.get('/', getPurchase);

/**
 * @swagger
 * /purchases:
 *   patch:
 *     summary: Actualizar una compra
 *     tags: [Purchases]
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
 *         description: Compra actualizada
 *       404:
 *         description: Compra no encontrada
 *       500:
 *         description: Error interno
 */
router.patch('/', updatePurchase);

/**
 * @swagger
 * /purchases:
 *   delete:
 *     summary: Eliminar una compra
 *     tags: [Purchases]
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
 *         description: Compra eliminada
 *       404:
 *         description: Compra no encontrada
 *       500:
 *         description: Error interno
 */
router.delete('/', deletePurchase);

export default router;
