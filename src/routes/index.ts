import { Express } from "express";
import productRoutes from "./productRoutes";
import menuRoutes from "./menuRoutes";
import productTranslationsRoutes from "./productAttributesRoutes";
import quizzesRoutes from './quizzesRoutes'


const routes = (app: Express): void => {
  app.use("/api/products", productRoutes);
  app.use("/api/menus", menuRoutes);
  app.use("/api/product/translate", productTranslationsRoutes);
  app.use("/api/quizzes", quizzesRoutes);

};

export default routes;
