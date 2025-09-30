import{test, expect, chromium} from '@playwright/test';
test("@regression,browser context page demo",async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const parentPage= await context.newPage();
    // const page2= await context.newPage();
    // await page1.goto("https://opensource-demo.orangehrmlive.com/")
    // await expect(page1).toHaveTitle("OrangeHRM")
    await parentPage.goto('https://testautomationpractice.blogspot.com/');
    await expect(parentPage).toHaveTitle("Automation Testing Practice");
    const childPage =await Promise.all([context.waitForEvent('page'),parentPage.locator("button:has-text('New Tab')").click()]);
    const pages = context.pages();
    console.log("number of pages:", pages.length)
    const pagetitle:string = await pages[0].title();
    expect(pagetitle).toBe("Automation Testing Practice")
    console.log("Title of the mainpage:",pagetitle)
    const pagetitle2:string = await pages[1].title();
    expect(pagetitle2).toBe("SDET-QA Blog")
    console.log("Title of the childpage:",pagetitle2)
    await pages[1].locator(".item-title a:has-text('How To Explain Project In Interview Freshers and Experienced')").click();
    const pageTitle3 = await pages[1].title();
    console.log("PageTitle is",pageTitle3);
    // await expect(pages[1]).toHaveTitle("SDET-QA Blog: How To Explain Project In Interview Freshers and Experienced");




    await browser.close();
})