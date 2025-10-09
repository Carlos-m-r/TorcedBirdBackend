import FurnitureModel from "../models/furniture.model.js";

// Exportamos modelo para instanciar directamente
export const Furniture = FurnitureModel;

// Crear mueble
export async function insertFurniture(furniture) {
  // Aseguramos que image siempre sea un array
  if (furniture.image && !Array.isArray(furniture.image)) {
    furniture.image = [furniture.image];
  }

  const newFurniture = new Furniture(furniture);
  return newFurniture.save();
}


export async function getAllFurniture() {
  return await Furniture.find(); // Devuelve todos los documentos
}

// Obtener mueble por referencia y nombre
export async function getFurniture(furniture) {
  return Furniture.findOne({reference: furniture.reference, name: furniture.name,
  });
}

// Actualizar mueble usando _id
export async function updateFurniture(filter, modifiedData) {
  // Aseguramos que image siempre sea un array
  if (modifiedData.image && !Array.isArray(modifiedData.image)) {
    modifiedData.image = [modifiedData.image];
  }

  return Furniture.findOneAndUpdate(
    filter,
    { $set: modifiedData },
    { new: true }
  );
}


// Eliminar mueble
export async function deleteFurniture(furniture) {
  return Furniture.findOneAndDelete({ reference: furniture.reference, name: furniture.name });
}