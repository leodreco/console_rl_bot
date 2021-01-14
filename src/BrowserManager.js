const puppeteer = require('puppeteer');
const { MissingEnvError, BadCredentialsError } = require('./errors');

class BrowserManager{
    browser;
    page;
    logged = false;
    username;
    constructor(browser){
        this.browser = browser;
    }

    async login(email, password){

        if(email == undefined || password == undefined
        || email == '' || password == ''){
            throw new MissingEnvError('Undefined credentials');
        }

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
            let usernameSpan = document.querySelector('.rlg-header-main-welcome-user >a > span');
            if(!!usernameSpan){
                return usernameSpan.textContent;
            }
            return undefined
        });

        if(!!username){
            this.logged = true;
            this.username = username;
            return username;
        }else{
            throw new BadCredentialsError('Bad credentials');
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
                    if(trades[i].bump_minute >= 14){
                        trades[i].bump_minute = 0;
                    }else{
                        trades[i].bump_minute++;
                    }
                    
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

var headless = true;
if(process.env.HEADLESS != undefined
&& process.env.HEADLESS.toLowerCase() == 'false'){
    headless = false
}

module.exports = async () => {
    if(bm == undefined){
        let browser = await puppeteer.launch({
            headless: headless,
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