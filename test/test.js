const { Builder, By, Key, until } = require('selenium-webdriver');

//console.log('Tests to generate:', global.testsNum)
describe('Suite', function () {
    for (let i = 1; i <= global.testsNum; i++) {
        // it(`Test ${i}`, function (done) {
        //     // Execution time will be random from 1000 to 10000 rounded to hundrends
        //     let time = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        //     time = Math.round(time / 100) * 100
        //     setTimeout(done, time)
        //     console.log(`Hello from Test ${i}:: time: ${time} !`)
        // })

        it(`Test ${i}`, function (done) {
            // Execution time will be random from 1000 to 10000 rounded to hundrends
            //let time = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            //time = Math.round(time / 100) * 100
            setTimeout(done, 100)
            //console.log(`Hello from Test ${i}:: time: ${time} !`)
        })
        it(`Test ${i}`, async function () {
            let driver = await new Builder()
                .forBrowser('chrome')
                .usingServer('http://192.168.1.170:4444/wd/hub')
                .build();
            try {
                await driver.get('http://www.google.com/ncr');
                await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
                await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
            } finally {
                await driver.quit();
                //console.log('All done!')
            }
        })
    }
})