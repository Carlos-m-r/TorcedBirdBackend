import * as furnitureService from "../services/furniture.service.js";

// Crear un mueble
export async function createFurniture(req, res) {
  try {
    const furnitureData = req.body;
    const result = await furnitureService.insertFurniture(furnitureData);

    res.status(201).json({ message: "Mueble creado", data: result });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Mueble ya existe', fields: error.keyValue });
    }
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un mueble
export async function deleteFurniture(req, res) {
  try {
    const { reference, name } = req.body;
    const result = await furnitureService.deleteFurniture({ reference, name });

    if (!result) {
      return res.status(404).json({ message: "No se encontró el mueble para eliminar" });
    }
    res.status(200).json({message: "Mueble eliminado correctamente",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un mueble
export async function updateFurniture(req, res) {
  try {
    const { reference, name } = req.body;
    const modifiedData = req.body;

    const result = await furnitureService.updateFurniture({ reference, name }, modifiedData);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró el mueble para actualizar" });
    }

    res.status(200).json({
      message: "Mueble actualizado correctamente",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un mueble
export async function getFurniture(req, res) {
  try {
    const { reference, name } = req.query;
    const result = await furnitureService.getFurniture({ reference, name });

    if (!result) {
      return res.status(404).json({ message: "Mueble no encontrado" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}