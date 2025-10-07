// src/services/user.service.js
import UserModel from '../models/user.model.js';

// Exportamos modelo por si quieres instanciarlo directamente
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

// Actualizar usuario
export async function updateUser(user, modifiedData) {
  return User.findOneAndUpdate(
    { nombre: user.nombre, mail: user.mail },
    { $set: modifiedData },
    { new: true }
  );
}

// Eliminar usuario
export async function deleteUser(user) {
  return User.findOneAndDelete({ nombre: user.nombre, mail: user.mail });
}