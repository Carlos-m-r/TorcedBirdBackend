import FurnitureModel from "../models/furniture.model.js";

// Exportamos modelo para instanciar directamente
export const Furniture = FurnitureModel;

export async function getAllFurniture() {
  return await Furniture.find(); // Devuelve todos los documentos
}


export async function insertFurniture(furniture) {
  // Ya no necesitamos normalizar image
  const newFurniture = new Furniture(furniture);
  return newFurniture.save();
}

export async function updateFurniture(filter, modifiedData) {
  // Ya no necesitamos normalizar image
  return Furniture.findOneAndUpdate(
    filter,
    { $set: modifiedData },
    { new: true }
  );
}

// Obtener mueble por referencia y nombre
export async function getFurniture(furniture) {
  return Furniture.findOne({reference: furniture.reference, name: furniture.name,
  });
}


// Eliminar mueble
export async function deleteFurniture(furniture) {
  return Furniture.findOneAndDelete({ reference: furniture.reference, name: furniture.name });
}