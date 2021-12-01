export function createUseCaseFactory(options) {
  return `import { ${options.moduleName}OrmRepository } from '@/infra/db/orm/${options.moduleName}'
import { Db${options.moduleName} } from '@/data/usecases'
import { ${options.moduleName}Interface } from '@/domain/usecases'

export const makeDb${options.moduleName} = (): ${options.moduleName}Interface => {
  const prismaRepository = new ${options.moduleName}OrmRepository()
  return new Db${options.moduleName}(prismaRepository)
}
`
}
