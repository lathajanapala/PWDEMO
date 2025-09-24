import{test,expect,Locator} from '@playwright/test';
test("Multi select dropdowns",async({page})=>{

    await page.goto("/");
    // const allLocators: Locator = page.locator("#colors>option")
    // expect(allLocators).toHaveCount(7);
    // const allTexts :string[] = (await allLocators.allTextContents()).map(text=>text.trim());
    // expect(allTexts).toContain("Green");
    // for(const text of allTexts){
    //     console.log(text);
    // }
     await page.locator("#colors").selectOption(["Red","Blue","White"]);

})