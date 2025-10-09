import * as userService from '../services/user.service.js';

// Crear usuario
export async function createUser(req, res) {
  try {
    const { email, password, name, surname, phone, shippingAddress, paymentMethod, additionalData } = req.body;
    const newUser = await userService.insertUser({
      email,
      password,
      name,
      surname,
      personal_id,
      phone,
      shippingAddress,
      paymentMethod,
      additionalData,
    });
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Usuario ya existe', fields: error.keyValue });
    }
    res.status(500).json({ error: 'Error creando usuario' });
  }
}

// Obtener usuario autenticado
export async function getUser(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado: falta ID de usuario en el token' });
    }

    const user = await userService.getUser({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
}

// Actualizar usuario
export async function updateUser(req, res) {
  try {
    const { email, modifiedData } = req.body;
    const updatedUser = await userService.updateUser({ email }, modifiedData);
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

// "Eliminar" usuario (borrado lógico → active: false)
export async function deleteUser(req, res) {
  try {
    const { email } = req.body;
    const deactivatedUser = await userService.deactivateUser({ email });

    if (!deactivatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario desactivado con éxito', user: deactivatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error desactivando usuario' });
  }
}

// 🔹 Actualizar contraseña
export async function updatePasswordController(req, res) {
  try {
    // Puedes obtener email del token si tu authMiddleware lo incluye:
    const email = req.user?.email;
    const { passwordActual, passwordNueva } = req.body;

    if (!email || !passwordActual || !passwordNueva) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const result = await userService.updatePassword({ email, passwordActual, passwordNueva });

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({ message: 'Error interno al actualizar contraseña' });
  }
}
