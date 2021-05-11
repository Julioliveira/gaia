import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/expressRouteAdapter'
import {
  makeExampleController
} from '@/main/factories/example'

export default (router: Router): void => {
  router.get(
    '/:id',
    adaptRoute(makeExampleController())
  )
}
