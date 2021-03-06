const puppeteer = require('puppeteer-core');
const moment = require('moment');
// 認証情報を外部に置く
const credential = require('./credential.js');

// 認証情報の必要プロパティがあるかの確認
if (
        !credential.hasOwnProperty('email') ||
        !credential.hasOwnProperty('password') ||
        !credential.hasOwnProperty('ip') ||
        !credential.hasOwnProperty('domainId')
    ){
    throw 'Rubbish. Credential info is empty or somethig wrong.';
}

(async () => {
    //option
    var option = {
        headless : true,
        executablePath: '/usr/bin/google-chrome-stable',
        slowMo:1,
        args: [
            // ゲストセッションで操作する。
            "--guest",
            
            // ウインドウサイズをデフォルトより大きめに。
            '--window-size=1280,800',
            
            //最大化で表示
            '--start-fullscreen',
            
            //情報バーの非表示
            '--disable-infobars',
            
            //シークレットモード
            '--incognito',
        ],
    }
    
    const browser = await puppeteer.launch(option)
    const page = await browser.newPage()
    
    await page.setViewport({
        width: 1280,
        height: 700,
        deviceScaleFactor: 1,
    });
    // Login
    await page.goto('https://secure.netowl.jp/netowl/')
    await page.type('input[name=mailaddress]', credential.email)
    await page.type('input[name=password]', credential.password)
    await page.click('input[name=action_user_login]')
    await page.waitForSelector('h1#logo')
    // Login成功
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm:ssZ")}] Login Successful.`)
    
    // DNS設定ページに遷移
    await page.goto('https://secure.netowl.jp/star-domain/')
    await page.waitForSelector('h1#logo')
    await page.click('input[name=action_user_detail_index]')
    await page.waitForSelector('h1#logo')
    await page.click('input[name=action_user_dns_index]')
    await page.waitForSelector('h1#logo')
    
    // 当該ホスト名のIPを変更
    await page.goto('https://secure.netowl.jp/star-domain/?action_user_dns_editpage_index=true')
    await page.waitForSelector('h1#logo')
    await page.focus('input[name="content[' + credential.domainId + ']"]')
    await page.keyboard.down('Control')
    await page.keyboard.down('KeyA')
    await page.keyboard.up('Control')
    await page.type('input[name="content[' + credential.domainId + ']"]', credential.ip)
    
    await page.click('input[name=action_user_dns_editpage_conf]') // 確認画面
    await page.waitForSelector('h1#logo')
    await page.click('input[name=action_user_dns_editpage_do]') // 確定する
    
    await browser.close()
    
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm:ssZ")}] やったぜ。 IP: ${credential.ip}`)
})()