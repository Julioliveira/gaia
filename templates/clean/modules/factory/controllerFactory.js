export function createControllerFactory(options) {
  return `import { Controller } from '@/presentation/protocols'
import { ${options.capitalizedModuleName}Controller } from '@/presentation/controllers'
import { make${options.capitalizedModuleName}Validation } from './${options.moduleName}ValidationFactory'
import { makeDb${options.capitalizedModuleName} } from './${options.moduleName}UsecaseFactory'

export const make${options.capitalizedModuleName}Controller = (): Controller => {
  return new ${options.capitalizedModuleName}Controller(
    makeDb${options.capitalizedModuleName}(),
    make${options.capitalizedModuleName}Validation()
  )
}
`
}
