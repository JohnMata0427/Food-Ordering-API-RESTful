// Import modules
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

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

// Export the instance of express
export default app