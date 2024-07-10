// Import modules
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerChefs from './routers/chef_routes.js'

// Initializations
const app = express()
dotenv.config()

// Config
app.set('port', process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Routes
app.get('/', (_, res) => res.send("Server on"))
app.use('/api', routerChefs)



app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


// Export the instance of express
export default app