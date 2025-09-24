import{test,expect,Locator} from '@playwright/test'
test("File Upload test",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
})