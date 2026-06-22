import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

router.get("/", protect, getProducts);

router.post(
  "/",
  protect,
  createProduct
);

router.put(
  "/:id",
  protect,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

export default router;