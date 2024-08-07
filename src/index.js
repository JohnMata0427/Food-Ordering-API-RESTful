import app from './server.js'
import connection from './database.js'

connection() // Connect to MongoDB

app.listen(app.get('port'), () => console.log(`Server ok on http://localhost:${app.get('port')}`))