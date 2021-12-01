import arg from 'arg'
import inquirer from 'inquirer'
import { createProject, createModule } from './main'
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--project': String,
      '--docker': Boolean,
      '--module': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-p': '--project',
      '-m': '--module'
    },
    {
      argv: rawArgs.slice(2)
    }
  )
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    architecture: args._[1],
    runInstall: args['--install'] || false,
    targetDirectory: args['--project'] || undefined,
    docker: args['--docker'] || false,
    module: args['--module'] || false
  }
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'Typescript'
  const defaultArchitecture = 'MVC'
  const defaultTargetDirectory = 'node-api'
  let questions = []
  if (options.module) {
    questions = [
      {
        type: 'list',
        name: 'httpMethod',
        message: 'Please choose which http method will be used on your module',
        choices: ['post', 'put', 'patch', 'get', 'delete']
      },
      {
        name: 'moduleName',
        message: 'Please type module name'
      },
      {
        name: 'endpoint',
        message: 'Please type endpoint url'
      }
    ]

    const answers = await inquirer.prompt(questions)

    return {
      ...options,
      httpMethod: answers.httpMethod,
      endpoint: answers.endpoint,
      moduleName: answers.moduleName,
      capitalizedModuleName:
        answers.moduleName.charAt(0).toUpperCase() +
        answers.moduleName.substring(1)
    }
  } else {
    if (options.skipPrompts) {
      return {
        ...options,
        template: options.template || defaultTemplate,
        architecture: options.architecture || defaultArchitecture,
        targetDirectory: options.targetDirectory || defaultTargetDirectory
      }
    }
    if (!options.targetDirectory) {
      questions.push({
        name: 'project',
        message: 'Please type the project name',
        default: defaultTargetDirectory
      })
    }
    if (!options.architecture) {
      questions.push({
        type: 'list',
        name: 'architecture',
        message: 'Please choose which project architecture to use',
        choices: ['Clean']
      })
    }
    if (
      !options.template &&
      options.architecture &&
      options.architecture !== 'Clean'
    ) {
      questions.push({
        type: 'list',
        name: 'template',
        message: 'Please choose which project template to use',
        choices: ['JavaScript', 'TypeScript']
      })
    } else {
      options.template = defaultTemplate
    }

    if (!options.git) {
      questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Initialize git repository?',
        default: false
      })
    }
    if (!options.docker) {
      questions.push({
        type: 'confirm',
        name: 'docker',
        message: 'Create Dockerfile?',
        default: true
      })
    }

    const answers = await inquirer.prompt(questions)
    return {
      ...options,
      template: options.template || answers.template,
      git: options.git || answers.git,
      architecture: options.architecture || answers.architecture,
      targetDirectory: options.targetDirectory || answers.project,
      docker: options.docker || answers.docker
    }
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  if (options.module) {
    return await createModule(options)
  }
  await createProject(options)
}
