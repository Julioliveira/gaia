export function createRoute(options) {
  return `import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/expressRouteAdapter'
import {
  make${options.capitalizedModuleName}Controller
} from '@/main/factories/${options.moduleName}'

export default (router: Router): void => {
  router.${options.httpMethod}(
    '${options.endpoint}',
    adaptRoute(make${options.capitalizedModuleName}Controller())
  )
}
`
}
