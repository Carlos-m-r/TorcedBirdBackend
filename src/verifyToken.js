import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Esto ayuda a resolver la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga explícita del .env
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Ajusta '../.env' si tu .env está en la raíz del proyecto

console.log('JWT_SECRET:', process.env.JWT_SECRET); // debería mostrar tu secret

const secret = process.env.JWT_SECRET;

// Datos de ejemplo
const payload = {
  id: '68e2b44f2e08ddd2cd229cbf',
  email: 'usuario@correo.com',
  admin: false
};

// Generar token
const token = jwt.sign(payload, secret, { expiresIn: '1h' });
console.log('Token generado:', token);

// Verificar token
try {
  const verified = jwt.verify(token, secret);
  console.log('Payload verificado:', verified);
} catch (err) {
  console.error('Token inválido', err);
}
