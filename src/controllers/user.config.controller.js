import * as userConfigService from "../services/user.conf.service.js";

// crear asincronas -> para que se ejecute en segundo plano sin interferir
// CRUD
export async function createUserConfig(req, res) {
  try {
    const userConfig = req.body;
    const result = await userConfigService.insertUserConfig(userConfig);

    res.status(201).json({ message: "Configuración guardada", data: result });
  } catch (error) {
    return res
      .status(409)
      .json({ error: "Configuración existente", fields: error.keyValue });
  }
}

// eliminar config

export async function deleteUserConfig(req, res) {
  try {
    const user = req.body;
    const result = await userConfigService.deleteUserConfig(user);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró una configuración para eliminar" });
    }
    res
      .status(200)
      .json({ message: "Configuración eliminada correctamente", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//actualizar config

export async function updateUserConfig(req, res) {
  try {
    const user = req.body;
    const modifiedUser = req.body;

    const result = await userConfigService.updateUserConfig(user, modifiedUser);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró la configuración para actualizar" });
    }

    res.status(200).json({
      message: "Configuración actualizada correctamente",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Obtener config
export async function getUserConfig(req, res) {
  try {
    const user = req.query;
    const result = await userConfigService.getUserConfig(user);

    if (!result) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}