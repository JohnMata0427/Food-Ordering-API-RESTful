<h1 align="center">
  <img height="35px" src="https://github.com/JohnMata0427/Food-Ordering-API-RESTful/assets/150484680/842b4e83-fd68-4f5e-8b20-e644053a69cf" alt="Logo">
   Food Ordering at ESFOT API RESTful 
  <img height="35px" src="https://github.com/JohnMata0427/Food-Ordering-API-RESTful/assets/150484680/842b4e83-fd68-4f5e-8b20-e644053a69cf" alt="Logo">
</h1>

---

> [!IMPORTANT]
> **Problematic Introduction**
> 
> The lunchtime rush at ESFOT poses a significant operational challenge.
> The influx of students seeking to order their meals within a limited timeframe (11 AM to 2 PM) results in the formation of long queues.
> These extended wait times not only inconvenience students but also negatively impact their overall dining experience.
> Additionally, the manual ordering process, with its inherent limitations, can lead to inefficiencies and potential errors.
> The existing system struggles to accommodate the high volume of orders during peak hours, leading to delays and frustration among students.

---

<h3 id="sprint-0">🥣 Sprint 0 - Development Environment Configuration</h3>

<details>
  <summary>✅ Definition of Requirements and Constraints</summary>

> - **User Registration and Authentication**
>   
>   - Users must be able to register with a username, password, and other relevant details.
>   - Users must be able to log in and log out of the system.
> 
> - **Menu Management**
>
>   - Administrators must be able to add, edit, and delete menu items.
>   - Users must be able to view the available menu, including descriptions, prices, and availability of dishes.
>
> - **Placing Orders**
>
>   - Users must be able to select menu items and place an order.
>   - Users must be able to view a summary of their order before confirming it.
>   - Users must be able to modify or cancel an order before final confirmation.
> 
> - **Order History**
>
>   - Users must be able to view their past orders.
>   - Users must be able to repeat previous orders easily.

</details>

<details>
  <summary>✅ Backend Project Structure</summary>

> - **Tools**
> 
> | Image                                                        | Name                       |
> |--------------------------------------------------------------|----------------------------|
> | ![VSCode](https://skillicons.dev/icons?i=vscode&theme=light) | Visual Studio Code         |
> | ![MongoDB](https://skillicons.dev/icons?i=mongo&theme=light) | MongoDB Atlas y Compass    |
> | ![NodeJS](https://skillicons.dev/icons?i=nodejs&theme=light) | Node.js                    |
> | ![PNPM](https://skillicons.dev/icons?i=pnpm&theme=light)     | PNPM (Recommendation)      |
> 
> - **Project Initialization and Installation Dependencies**
>   
>   - Open the terminal and run the following command:
>     ```
>     npm init -y
>     ```
>   - Now proceed to install the following modules for the development and production environment:
>     ```
>     npm i express bcryptjs mongoose dotenv nodemailer jsonwebtoken cors
>     ```
>     
> - **Project File Structure**
>
>   - Now we proceed to create a series of files and directories for the web server, running each of these commands in order:
>     ```
>     mkdir src
>     ```
>     ```
>     cd src
>     ```
>     ```
>     "config","controllers",”helpers”,”middlewares”,”models”,”routers” | %{New-Item -Name “$_” -ItemType “Directory”}
>     ```
>     ```
>     cd ..
>     ```
>   - Create the directories database.js index.js server.js .env .env.example .gitignore, the final result is this:
>   
>     ![image](https://github.com/JohnMata0427/Food-Ordering-API-RESTful/assets/150484680/a97398f6-1260-40ba-a4a8-56721dad300f)

</details>

<details>
  <summary>✅ Database Development</summary>

> - MongoDB Collections
>   - Chefs
>   - Students
>   - Orders
>   - Products

</details>

<details>
  <summary>✅ User Roles</summary>
  
> - Students 🧑‍🎓👩‍🎓
> - Chefs 👨‍🍳👩‍🍳

</details>

---

<h3 id="sprint-1">👨‍🍳 Sprint 1 - Chef Module</h3>

<details>
  <summary>✅ Endpoints to be Developeds</summary>

> <div align="center">
>   <h4>Development in Express</h4>
>   <img src="https://skillicons.dev/icons?i=express&theme=light">
> </div>
>
> <p>To create the backend endpoints, the MVC model is used, and the files that contain the sprint presentable are:</p>
> 
> [![Model](https://img.shields.io/badge/Chef%20Model-000000.svg?logo=JavaScript)](/src/models/chef.js)
> [![Controller](https://img.shields.io/badge/Chef%20Controller-000000.svg?logo=JavaScript)](/src/controllers/chef_controller.js)
> [![View](https://img.shields.io/badge/Chef%20Route-000000.svg?logo=JavaScript)](/src/routes/chef.routes.js)
>
> 🛠️ Endpoint for registration
>
> ```http
> POST /api/register
> ```
>
> 🛠️ Endpoints for sending and verifying email
> 
> ```http
> GET /api/confirmar/:token
> ```
>
> 🛠️ Endpoint for login
> 
> ```http
> POST /api/login
> ```
>
> 🛠️ Endpoint for password reset
> 
> ```http
> POST /api/chef/recuperarpassword
> ```
>
> 🛠️ Endpoint for cheking token for password reset
> 
> ```http
> GET /api/chef/recuperarpassword/:token
> ```
>
> 🛠️ Endpoint for new password
> 
> ```http
> POST /api/chef/nuevopassword/:token
> ```
>
> 🛠️ Endpoint for updating profile
> 
> ```http
> PUT /api/chef/:id
> ```
>
> 🛠️ Endpoint for updating password
> 
> ```http
> POST /api/chef/actualizarpassword
> ```
>
> 🛠️ Endpoint for getting chef by id
> 
> ```http
> GET /api/chef/:id
> ```
>
> 🛠️ Endpoint for getting all chefts
> ```http
> GET /api/chefs
> ```

</details>

<details>
  <summary>▶️ Interface Design</summary>

> <div align="center">
>   <h4>Prototyping in Figma</h4>
>   <img src="https://skillicons.dev/icons?i=figma&theme=light">
> </div>
>
> 🎨 Figma layout URL: https://www.figma.com/design/QgTkoUAXTEj120bpNTTu5c/Food-Ordering-Application-at-ESFOT

</details>

---

<h3 id="sprint-2">👩‍🎓 Sprint 2 - Student Module</h3>

<details>
  <summary>✅ Endpoints to be Developeds</summary>

> <div align="center">
>   <h4>Development in Express</h4>
>   <img src="https://skillicons.dev/icons?i=express&theme=light">
> </div>
>
> <p>To create the backend endpoints, the MVC model is used, and the files that contain the sprint presentable are:</p>
> 
> [![Model](https://img.shields.io/badge/Student%20Model-000000.svg?logo=JavaScript)](/src/models/estudiante.js)
> [![Controller](https://img.shields.io/badge/Student%20Controller-000000.svg?logo=JavaScript)](/src/controllers/estudiante_controller.js)
> [![View](https://img.shields.io/badge/Student%20Routes-000000.svg?logo=JavaScript)](/src/routes/estudiante.routes.js)
>
> 🛠️ Endpoint for registration
>
> ```http
> POST /api/estudiantes/registro
> ```
>
> 🛠️ Endpoints for sending and verifying email
> 
> ```http
> GET /api/estudiantes/confirmar/:id
> ```
>
> 🛠️ Endpoint for login
> 
> ```http
> POST /api/estudiantes/login
> ```
>
> 🛠️ Endpoint for password reset
> 
> ```http
> PUT /api/estudiantes/recuperarpassword
> ```
>
> 🛠️ Endpoint for cheking token for password reset
> 
> ```http
> GET /api/estudiantes/recuperarpassword/:token
> ```
>
> 🛠️ Endpoint for new password
> 
> ```http
> POST /api/estudiantes/nuevopassword/:token
> ```
>
> 🛠️ Endpoint for updating profile
> 
> ```http
> PUT /api/estudiantes/:id
> ```
>
> 🛠️ Endpoint for updating password
> 
> ```http
> PUT /api/estudiantes/actualizarpassword
> ```
>
> 🛠️ Endpoint for getting student by ID
> 
> ```http
> GET /api/estudiante/:id
> ```
>
> 🛠️ Endpoint for getting all students
> 
> ```http
> GET /api/estudiantes
> ```
>
> 🛠️ Endpoint for getting student profile
> 
> ```http
> GET /api/estudiantes/perfil
> ```
>
> 🛠️ Endpoint for deleting student account
> ```http
> DELETE /api/estudiantes/:id
> ```

</details>

---

<h3 id="sprint-3">🏷️🍛 Sprint 3 - Products and Orders Module</h3>

<details>
  <summary>✅ Endpoints to be Developeds</summary>

> <div align="center">
>   <h4>Development in Express</h4>
>   <img src="https://skillicons.dev/icons?i=express&theme=light">
> </div>
>
> <p>To create the backend endpoints, the MVC model is used, and the files that contain the sprint presentable are:</p>
> 
> [![Model](https://img.shields.io/badge/Order%20Model-000000.svg?logo=JavaScript)](/src/models/pedido.js)
> [![Controller](https://img.shields.io/badge/Order%20Controller-000000.svg?logo=JavaScript)](/src/controllers/pedido_controller.js)
> [![View](https://img.shields.io/badge/Order%20Routes-000000.svg?logo=JavaScript)](/src/routes/pedido.routes.js)
>
> [![Model](https://img.shields.io/badge/Product%20Model-000000.svg?logo=JavaScript)](/src/models/producto.js)
> [![Controller](https://img.shields.io/badge/Product%20Controller-000000.svg?logo=JavaScript)](/src/controllers/producto_controller.js)
> [![View](https://img.shields.io/badge/Product%20Routes-000000.svg?logo=JavaScript)](/src/routes/producto.routes.js)
>
> 🛠️ Endpoint for order registration
>
> ```http
> POST /api/pedido/registro
> ```
>
> 🛠️ Endpoints for getting order by id
> 
> ```http
> GET /api/pedido/:id
> ```
>
> 🛠️ Endpoint for getting all orders
> 
> ```http
> GET /api/pedidos
> ```
>
> 🛠️ Endpoint for getting all orders of authenticated student
> 
> ```http
> GET /api/pedidos/estudiante
> ```
>
> 🛠️ Endpoint for updating order state
> 
> ```http
> PUT /api/pedido/:id
> ```
>
> 🛠️ Endpoint for deleting order
> 
> ```http
> DELETE /api/pedido/:id
> ```
>
> 🛠️ Endpoint for creating product
> 
> ```http
> POST /api/productos/registro
> ```
>
> 🛠️ Endpoint for getting all products
> 
> ```http
> GET /api/productos
> ```
>
> 🛠️ Endpoint for getting product by id
> 
> ```http
> GET /api/productos/:id
> ```
>
> 🛠️ Endpoint for updating product
> 
> ```http
> PUT /api/productos/:id
> ```
>
> 🛠️ Endpoint for deleting product
> ```http
> DELETE /api/productos/:id
> ```

</details>

---

<h3 id="sprint-3">🥤🍫 Sprint 4 - Deploy and Documentation</h3>

<details>
  <summary>▶️ Deploy</summary>

> <div align="center">
>   <h4>Deployment in Render</h4>
>   <img height="50px" src="https://cdn.sanity.io/images/34ent8ly/production/ec37a3660704e1fa2b4246c9a01ab34e145194ad-824x824.png">
> </div>
>
> 🌐 Render Deployment URL: https://food-ordering-api-restful.onrender.com

</details>

<details>
  <summary>▶️ API Documentation</summary>

> <div align="center">
>   <h4>Documentation in Swagger</h4>
>   <img height="50px" src="https://cdn.svgporn.com/logos/swagger.svg">
> </div>
> 
> 📓 API Documentation URL: https://food-ordering-api-restful.onrender.com

</details>
