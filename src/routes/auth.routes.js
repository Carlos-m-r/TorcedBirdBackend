import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     operationId: authRegisterPost
 *     tags: [Auth]
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
 *                 format: email
 *                 description: Correo electrónico único del usuario
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Contraseña del usuario
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario (opcional)
 *               phone:
 *                 type: string
 *                 description: Número de teléfono (opcional)
 *               shippingAddress:
 *                 type: string
 *                 description: Dirección de envío (opcional)
 *               admin:
 *                 type: boolean
 *                 default: false
 *                 description: Determina si el usuario es administrador
 *             example:
 *               email: juan@example.com
 *               password: secret123
 *               name: Juan
 *               surname: Pérez
 *               phone: "+541112345678"
 *               shippingAddress: "Calle Falsa 123, Ciudad"
 *               admin: false
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 shippingAddress:
 *                   type: string
 *                 admin:
 *                   type: boolean
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/register', register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Auth]
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
 *             example:
 *               email: juan@example.com
 *               password: secret123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticación
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', login);

export default router;
