import arg from 'arg'
import inquirer from 'inquirer'
import { createProject } from './main'
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--project': String,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-p': '--project'
      
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
    targetDirectory: args['--project'] || undefined
  }
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'Typescript'
  const defaultArchitecture = 'MVC'
  const defaultTargetDirectory = 'node-api'
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      architecture: options.architecture || defaultArchitecture,
      targetDirectory: options.targetDirectory || defaultTargetDirectory
    }
  }

  const questions = []
   if (!options.targetDirectory) {
     questions.push({
       name: 'project',
       message: 'Please type the project name',
       default: defaultTargetDirectory
     })
   }
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript']
    })
  }
  if (!options.architecture) {
    questions.push({
      type: 'list',
      name: 'architecture',
      message: 'Please choose which project architecture to use',
      choices: ['MVC', 'Clean']
    })
  }
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      default: false
    })
  }

  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    architecture: options.architecture || answers.architecture,
    targetDirectory: options.targetDirectory || answers.project
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  console.log(options)
  await createProject(options)
}
