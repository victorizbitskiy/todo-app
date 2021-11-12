const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/default.json')
const exphbs = require('express-handlebars')

const PORT = config.PORT
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
// Регистрируем движок
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
    })

    app.listen(PORT, () => {
      console.log(`Server has been started on PORT ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
