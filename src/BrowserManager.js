const puppeteer = require('puppeteer');

class BrowserManager{
    browser;
    page;
    logged = false;
    username;
    constructor(browser){
        this.browser = browser;
    }

    async login(email, password){
        this.page = (await this.browser.pages())[0];
        
        await this.page.goto('https://rocket-league.com/', {
            waitUntil: 'domcontentloaded'
        });

        // Aceptar politica de privacidad
        if(await this.page.$('#acceptPrivacyPolicy') !== null){
            await Promise.all([
                this.page.waitForNavigation({
                    waitUntil: 'domcontentloaded'
                }),
                this.page.click('#acceptPrivacyPolicy')
            ]);
        }

        await this.page.click('#header-email', {delay: 50});
        await this.page.keyboard.type(email, {delay: 50});
        
        await this.page.click('#header-password', {delay: 50});
        await this.page.keyboard.type(password, {delay: 50});
        
        await Promise.all([
            this.page.waitForNavigation({
                waitUntil: 'domcontentloaded'
            }),
            this.page.click('input.rlg-btn-primary')
        ]);
        
        let username = await this.page.evaluate(() => {
            return document.querySelector('.rlg-header-main-welcome-user >a > span').textContent;
        });

        if(!!username){
            this.logged = true;
            this.username = username;
            return username;
        }else{
            return false;
        }
    }

    async bump(trades){
        await this.page.goto(`https://rocket-league.com/trades/${this.username}`, {
            waitUntil: 'networkidle2'
        });
        let res = await this.page.evaluate(trades => {
            
            for(let i = 0; i < trades.length; i++){
                let button = document.querySelector(`button[data-alias="${trades[i].cod}"]`);
                if(!!button){
                    trades[i].bump_minute++;
                    trades[i].ignore = true;
                    button.click();
                }
            }
            return trades;
        }, trades);
        trades = res;
        return trades;
    }
}

var bm = undefined

module.exports = async () => {
    if(bm == undefined){
        let browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {
                width: 1150,
                height: 800
            }
        });
        bm = new BrowserManager(browser);
        return bm;
    }else{
        return bm;
    }
}