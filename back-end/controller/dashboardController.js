import Customer from "../models/Customer.js";
import Product from "../models/Product.js";
import Invoice from "../models/Invoice.js";

export const getDashboard =
  async (req, res) => {
    try {
      const totalCustomers =
        await Customer.countDocuments();

      const totalProducts =
        await Product.countDocuments();

      const totalInvoices =
        await Invoice.countDocuments();

      const revenueData =
        await Invoice.aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$totalAmount"
              }
            }
          }
        ]);

      const totalRevenue =
        revenueData[0]
          ?.totalRevenue || 0;

      res.json({
        totalCustomers,
        totalProducts,
        totalInvoices,
        totalRevenue
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };