import express from "express";
import "dotenv/config"
import cors from "cors";
import routerChefs from "./routes/chef.routes.js";
import routerEstudiantes from "./routes/estudiantes.routes.js";
import routerPedidos from "./routes/pedidos.routes.js";
import routerProductos from "./routes/producto.routes.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import { serve, setup } from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();

app.use('/api-docs', serve, setup(swaggerSpec));

app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.get("/", (_, res) => res.send("Server on"));
app.use("/api", routerChefs);
app.use("/api", routerEstudiantes);
app.use("/api", routerPedidos);
app.use("/api", routerProductos);

app.use((_, res) => res.status(404).json({ msg: "Lo sentimos, la ruta solicitada no existe" }));

export default app;
