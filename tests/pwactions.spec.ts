import{test,expect,Locator} from '@playwright/test';
test("Verifying Input actions ",async ({page})=>{
await page.goto('/');
const firstName:Locator =  page.locator('#name')
firstName.fill("asdfg");
await expect(firstName).toBeVisible();
const maxLengthAttr:string | null = await firstName.getAttribute("maxlength");

expect(maxLengthAttr).toBe('15');
})
test("Verify Radio button actions",async({page})=>{
    await page.goto("/");
    const maleRadio: Locator = page.locator("#female");
    await expect(maleRadio).toBeEnabled();

   expect(await maleRadio.isChecked()).toBe(false);
   await maleRadio.check()
   await expect(maleRadio).toBeChecked();


})