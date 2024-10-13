import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwaggerDocs } from "./swagger";
import routes from "./routes";
import { responseWrapperMiddleware } from "./middlewares/responseWrapperMiddleware";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware (to avoid CORS errors)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middleware
app.use(bodyParser.json());

// wrap response in format
app.use(responseWrapperMiddleware);

routes(app);

app.use(errorHandler);

setupSwaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
