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
> 🛠️ Endpoint for registration
>
> 🛠️ Endpoints for sending and verifying email
> 
> 🛠️ Endpoint for login
> 
> 🛠️ Endpoint for password reset
> 
> 🛠️ Endpoint for updating profile
> 
> 🛠️ Endpoint for updating password
> 
> 🛠️ Endpoint for getting chef by id
> 
> 🛠️ Endpoint for getting all chefts

</details>

<details>
  <summary>▶️ Interface Design</summary>

> <div align="center">
>   <h4>Prototyping in Figma</h4>
>   <img src="https://skillicons.dev/icons?i=figma&theme=light">
> </div>
>
> 🎨 Figma layout URL: https://www.figma.com/design/QgTkoUAXTEj120bpNTTu5c/Food-Ordering-Application-at-ESFOT?node-id=0-1&t=Bi01naYjkzxz803s-1

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
> 🛠️ Endpoint for registration
>
> 🛠️ Endpoints for sending and verifying email
> 
> 🛠️ Endpoint for login
> 
> 🛠️ Endpoint for password reset
> 
> 🛠️ Endpoint for updating profile
> 
> 🛠️ Endpoint for updating password
> 
> 🛠️ Endpoint for getting student by ID
> 
> 🛠️ Endpoint for getting all students
> 
> 🛠️ Endpoint for deleting student account

</details>

---

<h3 id="sprint-3">🧾 Sprint 3 - Orders Module</h3>

<details>
  <summary>✅ Endpoints to be Developeds</summary>

> <div align="center">
>   <h4>Development in Express</h4>
>   <img src="https://skillicons.dev/icons?i=express&theme=light">
> </div>
>
> 🛠️ Endpoint for order registration
>
> 🛠️ Endpoints for getting order by id
> 
> 🛠️ Endpoint for getting all orders
> 
> 🛠️ Endpoint for updating order state
> 
> 🛠️ Endpoint for deleting order

</details>
