import { Express } from "express";
import productRoutes from "./productRoutes";
import menuRoutes from "./menuRoutes";
import productTranslationsRoutes from "./productAttributesRoutes";


const routes = (app: Express): void => {
  app.use("/api/products", productRoutes);
  app.use("/api/menus", menuRoutes);
  app.use("/api/product/translate", productTranslationsRoutes);
};

export default routes;
