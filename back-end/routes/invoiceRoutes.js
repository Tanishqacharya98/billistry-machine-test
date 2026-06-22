import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createInvoice
} from "../controller/invoiceController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createInvoice
);

export default router;