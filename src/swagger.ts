import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Menu API",
    version: "1.0.0",
    description: "A simple CRUD API for managing menus",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Menu: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "Menu ID",
          },
          title: {
            type: "string",
            description: "Menu title",
          },
          description: {
            type: "string",
            description: "Menu description",
          },
          slug: {
            type: "string",
            description: "Menu slug",
          },
          image_slug: {
            type: "string",
            description: "Image slug",
          },
          parentId: {
            type: "number",
            description: "ID of the parent menu",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwaggerDocs = (app: Express): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at /docs");
};
