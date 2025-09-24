import {test,expect} from '@playwright/test';
test("navigate to the home pagge and capture title",async ({page})=>{
    await page.goto("/opencart/");
    const url:string = page.url();
    console.log(`page URl is: ${url}`)
    expect(page).toHaveTitle("Your Store")
})