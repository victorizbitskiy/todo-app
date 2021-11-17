const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./config/default.json')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = config.PORT
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
// Регистрируем движок в экспрессе
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      config.mongoUri, {
      useNewUrlParser: true,
    }
    )

    app.listen(PORT, () => {
      console.log(`Server has been started on PORT ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
