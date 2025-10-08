import FurnitureModel from "../models/furniture.model.js";

// Exportamos modelo para instanciar directamente
export const Furniture = FurnitureModel;

// Crear mueble
export async function insertFurniture(furniture) {
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
  return Furniture.findOneAndUpdate(
    filter,           // filter = { _id: id }
    { $set: modifiedData },
    { new: true }     // devuelve el documento actualizado
  );
}


// Eliminar mueble
export async function deleteFurniture(furniture) {
  return Furniture.findOneAndDelete({ reference: furniture.reference, name: furniture.name });
}