import FurnitureModel from "../models/furniture.model.js";

// Exportamos modelo para instanciar directamente
export const Furniture = FurnitureModel;

// Crear mueble
export async function insertFurniture(furniture) {
  const newFurniture = new Furniture(furniture);
  return newFurniture.save();
}

// Obtener mueble por referencia y nombre
export async function getFurniture(furniture) {
  return Furniture.findOne({reference: furniture.reference, name: furniture.name,
  });
}

// Actualizar mueble
export async function updateFurniture(furniture, modifiedData) {
  return Furniture.findOneAndUpdate(
    { reference: furniture.reference, name: furniture.name },
    { $set: modifiedData },
    { new: true }
  );
}

// Eliminar mueble
export async function deleteFurniture(furniture) {
  return Furniture.findOneAndDelete({ reference: furniture.reference, name: furniture.name });
}