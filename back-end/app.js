import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/customers",
  customerRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/invoices",
  invoiceRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(errorHandler);

export default app;