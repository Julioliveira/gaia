import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'
import execa from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'
import { createRoute } from '../templates/clean/modules/routes'
import {
  createControllerFactory,
  createUseCaseFactory,
  createValidationFactory
} from '../templates/clean/modules/factory'
const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  })
}

async function copyDockerConfigFiles(options) {
  const currentFileUrl = import.meta.url
  const dockerConfigDirectory = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.architecture.toLowerCase(),
    'docker'
  )
  return copy(dockerConfigDirectory, options.targetDirectory, {
    clobber: false
  })
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'))
  }
  return
}

async function initDir(options) {
  if (!options.directory) return
  const result = await execa('mkdir', [options.directory], {
    cwd: options.targetDirectory
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to create directory'))
  }
  return
}

async function createMainRoutesFile(options) {
  if (!options.directory) return

  fs.writeFile(
    `${options.directory}/src/main/routes/${options.moduleName}.ts`,
    createRoute(options),
    (err) => {
      if (err) {
        return Promise.reject(new Error('Failed to write directory'))
      }
      fs.readFile(
        `${options.directory}/src/main/routes/index.ts`,
        (err, data) => {
          if (err) throw err
          let exportText =
            data.toString() +
            `export { default as ${options.moduleName}Route } from './${options.moduleName}'\n`
          fs.writeFile(
            `${options.directory}/src/main/routes/index.ts`,
            exportText,
            (err) => {
              if (err) {
                return Promise.reject(new Error('Failed to write index'))
              }
              return
            }
          )
        }
      )
    }
  )
}

async function createControllerFactoryFile(options) {
  if (!options.directory) return
  let CRUD = 'read'
  switch (options.httpMethod) {
    case 'post':
      CRUD = 'create'
      break
    case 'put':
      CRUD = 'update'
      break
    case 'patch':
      CRUD = 'update'
      break
    case 'delete':
      CRUD = 'remove'
      break
    default:
      CRUD = 'read'
      break
  }
  try {
    let result = await execa(
      'mkdir',
      [
        `${options.directory}/src/main/factories/${options.moduleName}`,
        `${options.directory}/src/main/factories/${options.moduleName}/${CRUD}`
      ],
      {
        cwd: options.targetDirectory
      }
    )
    if (result.failed) {
      return Promise.reject(new Error('Failed to create directory'))
    }
  } catch (err) {
    if (!err.stderr || !err.stderr.includes('File exists'))
      return Promise.reject(new Error('Failed to create directory'))
  }
  fs.writeFile(
    `${options.directory}/src/main/factories/${options.moduleName}/${CRUD}/${options.moduleName}ControllerFactory.ts`,
    createControllerFactory(options),
    (err) => {
      if (err) {
        return Promise.reject(new Error('Failed to write directory'))
      }
      // fs.readFile(
      //   `${options.directory}/src/main/routes/index.ts`,
      //   (err, data) => {
      //     if (err) throw err
      //     let exportText =
      //       data.toString() +
      //       `export { default as ${options.moduleName}Route } from './${options.moduleName}'\n`
      //     fs.writeFile(
      //       `${options.directory}/src/main/routes/index.ts`,
      //       exportText,
      //       (err) => {
      //         if (err) {
      //           return Promise.reject(new Error('Failed to write index'))
      //         }
      //         return
      //       }
      //     )
      //   }
      // )
    }
  )
}
async function createUseCaseFactoryFile(options) {
  if (!options.directory) return
  let CRUD = 'read'
  switch (options.httpMethod) {
    case 'post':
      CRUD = 'create'
      break
    case 'put':
      CRUD = 'update'
      break
    case 'patch':
      CRUD = 'update'
      break
    case 'delete':
      CRUD = 'remove'
      break
    default:
      CRUD = 'read'
      break
  }
  try {
    let result = await execa(
      'mkdir',
      [
        `${options.directory}/src/main/factories/${options.moduleName}`,
        `${options.directory}/src/main/factories/${options.moduleName}/${CRUD}`
      ],
      {
        cwd: options.targetDirectory
      }
    )
    if (result.failed) {
      return Promise.reject(new Error('Failed to create directory'))
    }
  } catch (err) {
    if (!err.stderr || !err.stderr.includes('File exists'))
      return Promise.reject(new Error('Failed to create directory'))
  }
  fs.writeFile(
    `${options.directory}/src/main/factories/${options.moduleName}/${CRUD}/${options.moduleName}UsecaseFactory.ts`,
    createUseCaseFactory(options),
    (err) => {
      if (err) {
        console.log(err)
        return Promise.reject(new Error('Failed to write directory'))
      }
      // fs.readFile(
      //   `${options.directory}/src/main/routes/index.ts`,
      //   (err, data) => {
      //     if (err) throw err
      //     let exportText =
      //       data.toString() +
      //       `export { default as ${options.moduleName}Route } from './${options.moduleName}'\n`
      //     fs.writeFile(
      //       `${options.directory}/src/main/routes/index.ts`,
      //       exportText,
      //       (err) => {
      //         if (err) {
      //           return Promise.reject(new Error('Failed to write index'))
      //         }
      //         return
      //       }
      //     )
      //   }
      // )
    }
  )
}

async function editConfigRoutesFile(options) {
  if (!options.directory) return

  fs.readFile(`${options.directory}/src/main/config/routes.ts`, (err, data) => {
    if (err) throw err
    const stringData = data.toString()
    const importIndex = stringData.indexOf(" } from '../routes'")
    const routeIndex = stringData.indexOf('app.use(router)')
    let exportText =
      stringData.substring(0, routeIndex) +
      `  ${options.moduleName}Route(router)\n  ` +
      stringData.substring(routeIndex)

    exportText =
      exportText.substring(0, importIndex) +
      `, ${options.moduleName}Route` +
      exportText.substring(importIndex)
    fs.writeFile(
      `${options.directory}/src/main/config/routes.ts`,
      exportText,
      (err) => {
        if (err) {
          return Promise.reject(new Error('Failed to write routes.ts'))
        }
        return
      }
    )
  })
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  }

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.architecture.toLowerCase(),
    options.template.toLowerCase()
  )
  options.templateDirectory = templateDir

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (error) {
    console.log('aaaaa:  ', error)
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1)
  }
  const tasks = new Listr([
    {
      title: 'Initializing Directory',
      task: () => initDir(options),
      enabled: () => options.directory
    },
    {
      title: 'Copying project files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Copying docker files',
      task: () => copyDockerConfigFiles(options),
      enabled: () => options.docker
    },
    {
      title: 'Initialize Git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined
    }
  ])
  await tasks.run()
  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}

export async function createModule(options) {
  options.directory = process.cwd()
  console.log(options)
  const tasks = new Listr([
    {
      title: 'Creating main/routes file',
      task: () => createMainRoutesFile(options),
      enabled: () => options.directory
    },
    {
      title: 'Edit main/config/routes',
      task: () => editConfigRoutesFile(options),
      enabled: () => options.directory
    },
    {
      title: 'Creating controller factory',
      task: () => createControllerFactoryFile(options),
      enabled: () => options.directory
    },
    {
      title: 'Creating usecase factory',
      task: () => createUseCaseFactoryFile(options),
      enabled: () => options.directory
    }
  ])
  await tasks.run()
  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
