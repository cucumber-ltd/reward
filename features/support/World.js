const path = require('path')
const { setWorldConstructor, Before, After } = require('cucumber')

const assemblyPath = path.resolve(process.env.CUCUMBER_ASSEMBLY || 'features/assemblies/01-DomainTestAssembly.js')
const assemblyName = path.basename(assemblyPath, '.js')
console.log(`🥒 ${assemblyName}`)

const AssemblyModule = require(assemblyPath)
setWorldConstructor(AssemblyModule)

Before(function() {
  return this.start()
})

After(function() {
  return this.stop()
})
