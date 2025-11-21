//Import statements
import express, {Request, Response, Express } from "express";
import dotenv from "dotenv";

//Load environment variables
dotenv.config()

//Other imports
import morgan from "morgan";
import alertRoutes from "../src/api/v1/routes/alertRoutes"
import forecastRoutes from "../src/api/v1/routes/forecastroutes"
import locationRoutes from "../src/api/v1/routes/locationRoutes"
import setupSwagger from "../src/config/swagger";
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHanlder"
//import authMiddleware from "./api/v1/middleware/authenticate";

//Express app created 
const app: Express = express();

// Logging middleware
if (process.env.NODE_ENV === "production") {
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  app.use(consoleLogger);

  app.use(morgan("dev"));
}

// Parsing json request
app.use(express.json());

//health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// Apply authentication middleware before routes
//app.use(authMiddleware);

//Forecast endpoint
app.use("/api/v1/forecasts", forecastRoutes)

//Locations endpoint
app.use("/api/v1/locations", locationRoutes)

//alerts endpoint
app.use("/api/v1/alerts", alertRoutes)

//Setup swagger
setupSwagger(app)

// Global error handler 
app.use(errorHandler);

//Exporting app
export default app;