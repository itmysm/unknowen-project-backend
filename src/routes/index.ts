import { Express } from "express";
import productRoutes from "./productRoutes";
import menuRoutes from "./menuRoutes";

const routes = (app: Express): void => {
  app.use("/api/products", productRoutes);
  app.use("/api/menus", menuRoutes);
};

export default routes;
