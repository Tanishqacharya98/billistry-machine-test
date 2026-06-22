import Product from "../models/Product.js";

export const getProducts =
  async (req, res) => {
    try {

      const {
        search,
        filter
      } = req.query;

      const query = {};

      if (search) {
        query.name = {
          $regex: search,
          $options: "i"
        };
      }

      if (filter === "low") {
        query.price = {
          $lt: 1000
        };
      }

      if (filter === "high") {
        query.price = {
          $gte: 1000
        };
      }

      const products =
        await Product.find(query);

      res.json(products);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

export const createProduct =
  async (req, res) => {
    const product =
      await Product.create(req.body);

    res.status(201).json(product);
  };

export const updateProduct =
  async (req, res) => {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json(product);
  };

export const deleteProduct =
  async (req, res) => {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product Deleted"
    });
  };