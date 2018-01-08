const path = require('path')
const { setWorldConstructor, Before, After } = require('cucumber')

const assemblyRelativePath = process.env.CUCUMBER_ASSEMBLY || 'features/assemblies/01-DomainTestAssembly.js'
const assemblyPath = path.resolve(assemblyRelativePath)
const assemblyName = path.basename(assemblyPath, '.js')
console.log(`🥒 ${assemblyName} (CUCUMBER_ASSEMBLY=${assemblyRelativePath} ./cucumber)`)

const AssemblyModule = require(assemblyPath)
setWorldConstructor(AssemblyModule)

Before(function() {
  return this.start()
})

After(function() {
  return this.stop()
})
