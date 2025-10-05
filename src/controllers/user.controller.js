import * as userService from '../services/user.service.js';

// Crear usuario
export async function createUser(req, res) {
  try {
    const { nombre, mail, age } = req.body;
    const newUser = await userService.insertUser({ nombre, mail, age });
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Usuario ya existe', fields: error.keyValue });
    }
    res.status(500).json({ error: 'Error creando usuario' });
  }
}

// Obtener usuario
export async function getUser(req, res) {
  try {
    // Para GET, los datos suelen enviarse como query params
    const { nombre, mail } = req.query;
    const user = await userService.getUser({ nombre, mail });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
}

// Actualizar usuario
export async function updateUser(req, res) {
  try {
    const { nombre, mail, modifiedData } = req.body;
    const updatedUser = await userService.updateUser({ nombre, mail }, modifiedData);
    if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Datos duplicados', fields: error.keyValue });
    }
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
}

// Eliminar usuario
export async function deleteUser(req, res) {
  try {
    const { nombre, mail } = req.body;
    const deletedUser = await userService.User.findOneAndDelete({ nombre, mail });
    if (!deletedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado con éxito', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
}
