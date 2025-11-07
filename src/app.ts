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

import setupSwagger from "../config/swagger";

//Express app created 
const app: Express = express();

// Parsing json request
app.use(express.json());

// HTTP request logging with Morgan
app.use(morgan("combined"));

//health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

//Forecast endpoint
app.use("/api/v1/forecasts", forecastRoutes)

//Locations endpoint
app.use("/api/v1/locations", locationRoutes)

//alerts endpoint
app.use("api/v1/alerts", alertRoutes)


//Setup swagger
setupSwagger(app)

//Exporting app
export default app;