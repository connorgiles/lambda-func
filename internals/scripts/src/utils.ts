import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export const copyRecursiveSync = (source: string, destination: string): void => {
  if (!fs.existsSync(source)) throw new Error('Failed to copy directory - source does not exist')

  if (fs.statSync(source).isDirectory()) {
    if (!fs.existsSync(destination)) fs.mkdirSync(destination)

    fs.readdirSync(source).forEach((childItemName) => {
      copyRecursiveSync(path.join(source, childItemName), path.join(destination, childItemName))
    })
  } else {
    fs.copyFileSync(source, destination)
  }
}

export const editJsonFile = (jsonPath: string, update: (json: any) => any): void => {
  const fileContents = fs.readFileSync(jsonPath).toString()

  const json = JSON.parse(fileContents)
  const modifiedJson = update(json)

  fs.writeFileSync(jsonPath, JSON.stringify(modifiedJson, null, 2))
}

export const rushUpdate = () => exec('rush update')
