import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";

export const createInvoice = async (
  req,
  res
) => {
  try {
    const { customerId, items } =
      req.body;

    let totalAmount = 0;

    for (const item of items) {
      const product =
        await Product.findById(
          item.productId
        );

      if (!product) {
        return res.status(404).json({
          message: "Product Not Found"
        });
      }

      totalAmount +=
        product.price *
        item.quantity;

      product.quantity -=
        item.quantity;

      await product.save();
    }

    const invoice =
      await Invoice.create({
        customerId,
        items,
        totalAmount
      });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};