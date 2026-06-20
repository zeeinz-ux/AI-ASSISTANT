import cors from "cors";
import express from "express";
import { checkCloudConfig, config } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { chatRouter } from "./routes/chat.route";
import { healthRouter } from "./routes/health.route";

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use((req, _res, next) => {
  console.log(`[HTTP] ${req.method} ${req.originalUrl}`);

  if (req.method === "POST") {
    console.log("[BODY]", JSON.stringify(req.body, null, 2));
  }

  next();
});

app.use("/api", chatRouter);
app.use(healthRouter);

app.use(errorHandler);

checkCloudConfig();

app.listen(config.port, () => {
  console.log(
    `[Synapse AI] AI Router Service berjalan di http://localhost:${config.port}`,
  );
  console.log(
    `[Synapse AI] Mode: ${config.nodeEnv} | Local model: ${config.ollama.model}`,
  );
});
