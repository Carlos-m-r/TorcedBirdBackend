import PurchaseModel from "../models/purchase.model.js";

// Exportamos modelo por si quieres instanciarlo directamente
export const Purchase = PurchaseModel;

// Crear compra
export async function insertPurchase(purchase) {
  const newPurchase = new Purchase(purchase);
  return newPurchase.save();
}

// Obtener compra por id (o puedes adaptarlo a otros filtros)
export async function getPurchase(purchase) {
  return Purchase.findOne({ _id: purchase.id });
}

// Actualizar compra
export async function updatePurchase(purchase, modifiedData) {
  return Purchase.findOneAndUpdate(
    { _id: purchase.id },
    { $set: modifiedData },
    { new: true }
  );
}

// Eliminar compra
export async function deletePurchase(purchase) {
  return Purchase.findOneAndDelete({ _id: purchase.id });
}
