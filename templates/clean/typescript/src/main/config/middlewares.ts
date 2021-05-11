import { Express } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'
export default (app: Express): void => {
  app.use((req, res, next) => {
    next()
  })
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
