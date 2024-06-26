require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'static')))
app.use(`/static`,express.static(`static`))
app.use(fileUpload())
app.use('/api', router)


// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () =>
{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    } catch(e){
        console.log(e)
    }

}

start()

module.exports = app;
