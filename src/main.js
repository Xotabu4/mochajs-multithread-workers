const { Worker, isMainThread, workerData } = require('worker_threads');
let uuid = require('uuid')
let xml = require('js2xmlparser');

process.setMaxListeners(0);
global.testsNum = 30
var tty = require('tty');
tty.getWindowSize = function () {
    return 75
}
var Mocha = require('mocha')
var fs = require('fs')
var path = require('path')
// Instantiate a Mocha instance.
var mocha = new Mocha()
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
    mocha.loadFiles()
    let count = 0
    mocha.suite.eachTest((test) => {
        count++
        if (isMainThread) {
            let path = require('path')
            const absolutePath = path.resolve(process.cwd(), './src/worker.js')
            let w = new Worker(absolutePath, {
                workerData: {
                    grep: test.title,
                    testsNum: global.testsNum
                }
            });
            w.on('message', function (res) {
                let fs = require('fs-extra');
                fs.outputFileSync(path.join('./allure_results', uuid.v4() + '-testsuite.xml'), xml.parse('ns2:test-suite', res.xmlResult));
            })
        }
    })
})


