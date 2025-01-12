import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "API RESTful para el Sistema de Pedidos de Comida en la Asociación de la ESFOT",
      description: "Esta API se encarga de publicitar y gestionar las opciones de comida disponibles en la Asociación de la facultad ESFOT (Escuela de Formación de Tecnologos), así como el acceso al aplicativo en el campus de la Escuela Politécnica Nacional mediante un sistema digital.",
      contact: {
        name: "John Mata",
        email: "jhonmata0427@gmail.com"
      },
      servers: ["https://food-ordering-api-restful.onrender.com/api"],
    },
    basePath: "/api",
    servers: [
      {
        url: "https://food-ordering-api-restful.onrender.com/api",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routers/*.routes.js"],
}

export const swaggerSpec = swaggerJSDoc(options);