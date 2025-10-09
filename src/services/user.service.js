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

// Actualizar usuario
export async function updateUser({ email }, modifiedData) {
  return User.findOneAndUpdate(
    { email },
    { $set: modifiedData },
    { new: true }
  );
}

// Desactivar usuario (borrado lógico)
export async function deactivateUser({ email }) {
  return User.findOneAndUpdate(
    { email },
    { $set: { active: false } },
    { new: true }
  );
}
