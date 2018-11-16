const { Worker, isMainThread, workerData } = require('worker_threads');

//console.log(workerData)
//console.log("Hello from worker!")
//console.log(global.testsNum)
global.testsNum = workerData.testsNum


var tty = require('tty');

tty.getWindowSize = function () {
    return 75
}
var Mocha = require('mocha')

var fs = require('fs')
var path = require('path')



// Instantiate a Mocha instance.
var mocha = new Mocha({
    grep: `${workerData.grep}$`,
    timeout: 20000,
    reporter: 'mocha-allure-reporter'
})

var testDir = './test/'

// Add each .js file to the mocha instance
fs.readdir(testDir, function (err, files) {
    if (err) throw err

    files.filter(function (file) {
        // Only keep the .js files
        return file.substr(-3) === '.js'
    }).forEach(function (file) {
        let filename = path.join(testDir, file)
        mocha.addFile(filename)
    })
    mocha.run()
})
