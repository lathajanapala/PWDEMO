import{test,expect,Locator} from '@playwright/test';
test("This is testing bootstrap hidden dropdown", async ({ page }) => {
    await page.goto("/web/index.php/auth/login"); // Replace with the correct URL
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "screenshots/mainpage.png", fullPage: true });
    const username:Locator = page.locator("input[name ='username']");
    await username.fill("Admin");
    const password:Locator = page.locator("input[name ='password']");
    await password.fill("admin123");
    const loginButton:Locator = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    //click on the PIM
    await page.getByText("PIM").click();
    const dropdowns:Locator = page.locator("form i");
    await dropdowns.nth(2).click();
    await page.waitForTimeout(3000)
    // click shift+win+P and then enter emulator focus page
    const hiddendropdowns :Locator = page.locator("div.oxd-select-option")
    // const hiddendropdown: Locator =page.locator("div.oxd-select-option", { hasText: /Chief Executive Officer/ });
   const optionTexts: string[] = await hiddendropdowns.allInnerTexts();
   for (const text of optionTexts) {
    console.log("Found options:", text.trim()); // <-- should log all options
        if (text.trim() === "Chief Executive Officer") {
        await hiddendropdowns.filter({ hasText: text }).first().click();

     }
   }

});