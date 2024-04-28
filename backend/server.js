import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import createConnection from "./database/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || "8080";
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.use("/user", routes.signupRoute);
app.use("/user", routes.signinRouter);

const server = createServer(app);
server.listen(port);

server.on("listening", async () => {
  const { connection } = await createConnection(MONGO_URL);
  console.log(`Connected to mongo at port ${connection.port}`);
  console.log(`Server is listening at port ${port}`);
});

server.on("error", () => console.log(`Server is not listening`));
