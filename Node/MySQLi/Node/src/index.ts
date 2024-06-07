import { PORT } from "./config/Config"
const cors = require('cors')
const bodyParser = require('body-parser')
import { sequelize } from "./config/Database"
import express = require("express")
import UserRoutes from "./Routes/UserRoutes"
// FRONT API END
//ROUTER END


// APP SETUP
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({ "origin": "*" }))
app.set('view engine', "ejs")

app.use("/api",UserRoutes)
app.listen(PORT, () => {

  sequelize.authenticate().then(async () => {
    try {
      await sequelize.sync()
      console.log("Database Connected to MySql")
      console.log(`Database is running on ${PORT}`)
    } catch (error: any) {
      console.log(error.message, 'Database Error')
    }
  }).catch((err: any) => {
    console.log(err.message, 'Database Error')
  })
})