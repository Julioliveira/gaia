import { Express, Router } from 'express'
import { exampleRoute } from '../routes'
export default (app: Express): void => {
  const router = Router()
  exampleRoute(router)
  app.use(router)
}
