import * as purchaseService from "../services/purchase.service.js";

//crear asincronas -> para q se ejecute en segundo plano sin molestar

//CRUD
//crear compra
//crear funcion asin exportanle
export async function createPurchase(req, res) {
    try {
        const purchaseData = req.body;   //Guardo los datos de la compra
        const result = await purchaseService.insertPurchase(purchaseData)          //llamaos a las funciones del service y las guardamos en 'result'
        res.status(201).json({ message: "Nueva compra realizada 🙂 ", data: result });


    } catch (error) {
        return res.status(409).json({ error: 'La compra no ha sido posible realizarse', fields: error.keyValue });
    }
}

//READ
//Visualizar compras realizadas
export async function getPurchase(req, res) {
  try {
    const  invoiceNumber  = req.query;
    const result = await invoiceNumber.getPurchase(invoiceNumber);

    if (!result) {
      return res.status(404).json({ message: "Compra no encontrada :(" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//UPDATE
//dEVOLUCION PARCIAL
export async function updatePurchase(req, res) {
  try {
    const invoiceNumber  = req.body;
    const modifiedPurchase = req.body;

    const result = await purchaseService.updatePurchase(invoiceNumber, modifiedPurchase);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró el pedido para actualizar" });
    }

    res.status(200).json({
      message: "pedido actualizado correctamente",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




//DELETE 
//Eliminar - Devolucion compra COMPLETA
export async function deletePurchase(req, res) {
  try {
    const invoiceNumber = req.body;
    const result = await purchaseService.deletePurchase(invoiceNumber);

    if (!result) {
      return res.status(404).json({ message: "No se encontró el pedido para eliminar" });
    }
    res.status(200).json({message: "pedido eliminado correctamente",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}