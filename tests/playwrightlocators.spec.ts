// DOM - Document Model---An API interface provided by browser
// page.getByLable("#name").fill("pushpa")
import{test,expect} from '@playwright/test';
test("Write a locator using playwright locators getByLabe",async ({page})=>{
    await page.goto("/opencart/");
    await page.locator('a.dropdown-toggle[title="My Account"]').click();

    // await page.getByRole('link',{name:'My Account'}).click();
    await page.getByRole('link',{name:'Register'}).click();
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
    await page.getByRole('textbox', { name: '* First Name' }).fill("Maple");
    await page.getByRole('textbox', { name: '* Last Name' }).fill("Labrador");
    await page.getByRole('textbox', { name: '* E-Mail' }).fill('qaz123@gmail.com');
    await page.getByRole('textbox', { name: '* telephone' }).fill('1234567890');
    await page.locator('#input-password').fill('1234567');
    await page.locator('#input-confirm').fill('1234567');
    await page.locator('//input[@type="checkbox" and @name="agree"]').check();
    // await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();

  




})