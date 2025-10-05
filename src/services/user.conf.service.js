import UserConfigModel from "../models/user.config.model.js";

// Exportamos modelo por si quieres instanciarlo directamente
export const UserConfig = UserConfigModel;

// Crear configuración de usuario
export async function insertUserConfig(config) {
  const newConfig = new UserConfig(config);
  return newConfig.save();
}

// Obtener configuración de usuario por id (o por userId si prefieres)
export async function getUserConfig(config) {
  return UserConfig.findOne({ _id: config.id });
  // Para buscar por usuario: { userId: config.userId }
}

// Actualizar configuración de usuario
export async function updateUserConfig(config, modifiedData) {
  return UserConfig.findOneAndUpdate(
    { _id: config.id },
    { $set: modifiedData },
    { new: true }
  );
}

// Eliminar configuración de usuario
export async function deleteUserConfig(config) {
  return UserConfig.findOneAndDelete({ _id: config.id });
}
