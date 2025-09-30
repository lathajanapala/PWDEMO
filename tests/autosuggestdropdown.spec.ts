import{test,expect,Locator} from '@playwright/test';
test("@regression, Auto suggest dropdown",async({page})=>{
   await page.goto("/");
   const inputBox:Locator = page.locator("input[name='q']");
   await inputBox.fill("smart");
   await page.waitForTimeout(4000);
//    get all the suggested option we need to enter shift+win+p
const options:Locator = page.locator("ul>li");
const optionsCount: number = await options.count();
// expect(optionsCount).toBe(8);
// for(let i =0; i<optionsCount; i++){
//     console.log(await options.nth(i).innerText());
// }
const optionTexts: string[] = await options.allInnerTexts();
for (const text of optionTexts) {
    console.log(text);
    if (text.toLowerCase().includes("smart phone")) {
        await options.locator(`text=${text}`).click();
        break;
    }
}

})