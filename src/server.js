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
app.set("port", process.env.PORT || 3000);

const allowedOrigins = [
    'https://pedidos-comida-esfot.vercel.app', 
    'https://food-ordering-api-restful.onrender.com/api', 
];

app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,  
}));

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
