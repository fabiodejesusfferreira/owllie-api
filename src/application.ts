import express from "express";
import router from "./routes/routes";
import cors from "cors";

function createApp() {
  const app = express();
  /* const corsOptions: cors.CorsOptions  = {
    origin: 'http://www.fabiodejesus.dev',
  }; */

  app.use(express.json());

  app.use("/api", router);

  app.use(cors(/* corsOptions */));

  return app;
}

export default createApp;
