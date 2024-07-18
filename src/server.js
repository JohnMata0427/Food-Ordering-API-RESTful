import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerChefs from "./routers/chef.routes.js";
import routerEstudiantes from "./routers/estudiantes.routes.js";
import routerPedidos from "./routers/pedidos.routes.js";

const app = express();
dotenv.config();

app.set("port", process.env.port || 3000);
app.use(cors());

app.use(express.json());

app.get("/", (_, res) => res.send("Server on"));
app.use("/api", routerChefs);
app.use("/api", routerEstudiantes);
app.use("/api", routerPedidos);

app.use((_, res) => res.status(404).send("Endpoint no encontrado - 404"));

export default app;
