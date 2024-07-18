import express from "express";
import "dotenv/config"
import cors from "cors";
import routerChefs from "./routers/chef.routes.js";
import routerEstudiantes from "./routers/estudiantes.routes.js";
import routerPedidos from "./routers/pedidos.routes.js";
import routerProductos from "./routers/producto.routes.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.set("port", process.env.port || 3000);
app.use(cors());

app.use(express.json());

app.get("/", (_, res) => res.send("Server on"));
app.use("/api", routerChefs);
app.use("/api", routerEstudiantes);
app.use("/api", routerPedidos);
app.use("/api", routerProductos);

app.use((_, res) => res.status(404).send("Endpoint no encontrado - 404"));

export default app;
