import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

export const User = UserModel;

// Crear usuario
export async function insertUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

// Obtener usuario por id
export async function getUser({ id }) {
  return User.findById(id).select('-password');
}

// 🔹 Obtener usuario con contraseña (solo para verificación interna)
export async function getUserWithPassword({ email }) {
  return User.findOne({ email });
}

// Actualizar usuario
export async function updateUser({ email }, modifiedData) {
  return User.findOneAndUpdate(
    { email },
    { $set: modifiedData },
    { new: true }
  );
}

// 🔹 Actualizar contraseña
export async function updatePassword({ email, passwordActual, passwordNueva }) {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: 'Usuario no encontrado' };

  const passwordMatch = await bcrypt.compare(passwordActual, user.password);
  if (!passwordMatch) {
    return { success: false, message: 'La contraseña actual no es correcta' };
  }

  const isSame = await bcrypt.compare(passwordNueva, user.password);
  if (isSame) {
    return { success: false, message: 'La nueva contraseña no puede ser igual a la anterior' };
  }

  const hashedPassword = await bcrypt.hash(passwordNueva, 10);
  user.password = hashedPassword;
  await user.save();

  return { success: true, message: 'Contraseña actualizada correctamente' };
}

// Desactivar usuario (borrado lógico)
export async function deactivateUser({ email }) {
  return User.findOneAndUpdate(
    { email },
    { $set: { active: false } },
    { new: true }
  );
}
