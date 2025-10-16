import express from "express";
import router from "./routes/routes";
import cors from "cors";
import connectToDatabase from "./database/connection";

function createApp() {
  const app = express();
  /* const corsOptions: cors.CorsOptions  = {
    origin: 'http://www.fabiodejesus.dev',
  }; */

  connectToDatabase();

  app.use(cors());

  app.use(express.json());

  app.use(router);

  return app;
}

export default createApp;
