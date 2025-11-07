//Import statements
import express, {Request, Response, Express } from "express";
import dotenv from "dotenv";

//Load environment variables
dotenv.config()

//Other imports
import morgan from "morgan";
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



//Setup swagger
setupSwagger(app)

//Exporting app
export default app;