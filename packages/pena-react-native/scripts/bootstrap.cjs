const os           = require('node:os')
const path         = require('node:path')
const childProcess = require('node:child_process')

const root    = path.resolve(__dirname, '..')
const args    = process.argv.slice(2)
const options = {
  cwd     : process.cwd(),
  env     : process.env,
  stdio   : 'inherit',
  encoding: 'utf8',
}

if (os.type() === 'Windows_NT')
  options.shell = true

const result = (process.cwd() !== root || args.length > 0)
  ? childProcess.spawnSync('yarn', args, options)
  : childProcess.spawnSync('yarn', ['bootstrap'], options)

process.exitCode = result.status
