import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import cors from 'cors'
import Sequelize from 'Sequelize'
import { PG_CONFIG } from '../config'
const { user, host, database, password, port } = PG_CONFIG

export const startServer = async PORT => {
  const app = express().use('*', cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  app.use((req, res, next) => {
    req.context = { sequelize }
    next()
  })

  app.use('/test', async (req, res) => {
    try {
      await sequelize.authenticate()
      res.json({ success: 'Connection has been established successfully.' })
    } catch (e) {
      res.json({ error: e })
    }
  })

  app.use('/', (req, res) => {
    res.json({
      status: '0k',
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  })

  app.listen(PORT, () => console.log(`server launched, visit http://localhost:${PORT}`))
}
