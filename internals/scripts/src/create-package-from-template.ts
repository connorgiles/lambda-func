import yargs from 'yargs'

import { copyRecursiveSync, editJsonFile, rushUpdate } from './utils'

const DEFAULT_NAMESPACE = '@lambda-func'
const PACKAGE_DIRECTORY = 'packages'
const TEMPLATE_DIRECTORY = 'internals/template'

const getArguments = (): { name: string } =>
  yargs(process.argv)
    .option('name', {
      type: 'string',
      alias: 'n',
      description: 'Name of the new packages',
      demandOption: true
    })
    .parseSync()

type PackageDetails = {
  packageName: string
  projectFolder: string
}

const packageDetails = (name: string): PackageDetails => ({
  packageName: `${DEFAULT_NAMESPACE}/${name}`,
  projectFolder: `${PACKAGE_DIRECTORY}/${name}`
})

const addToRushFile = (details: PackageDetails) =>
  editJsonFile('rush.json', (rushJson) => ({
    ...rushJson,
    projects: [
      ...rushJson.projects,
      {
        ...details,
        shouldPublish: true
      }
    ]
  }))

const changePackageName = ({ packageName, projectFolder }: PackageDetails) =>
  editJsonFile(`${projectFolder}/package.json`, (packageJson) => ({
    ...packageJson,
    name: packageName
  }))

const main = () => {
  const { name } = getArguments()
  const details = packageDetails(name)

  copyRecursiveSync(TEMPLATE_DIRECTORY, details.projectFolder)

  addToRushFile(details)
  changePackageName(details)

  rushUpdate()
}

main()
