import{test,expect,Locator} from '@playwright/test';
import { text } from 'stream/consumers';
test("Single select dropdown ",async({page})=>{
    await page.goto("/");
    // const country: Locator = page.locator('#country');
    const  dropdownOptions:Locator = page.locator("#country>option")
    await expect(dropdownOptions).toHaveCount(10);
    // to check dropdown option is there or not
    await expect(dropdownOptions.filter({ hasText: "India" })).toHaveCount(1);
    const containText :string[] =(await dropdownOptions.allTextContents()).map(text=>text.trim());
    //  console.log(containText);
     expect(containText).toContain('Germany')
     for(const text of containText){
      console.log(text);
     }
    // await country.selectOption("India") // select by visible text
    // await expect(country).toHaveValue("india");
    // await page.screenshot({path:"tests/screenshots/visibletext.png",fullPage:true})
    // await country.selectOption({value:'uk'})// select option by value
    // await expect(country).toHaveValue("uk")
    // await page.screenshot({path:"tests/screenshots/valuetext.png",fullPage:true})
    // await country.selectOption({index:5});
    // await expect(country).toHaveValue("australia")
    // await page.screenshot({path:"tests/screenshots/indextext.png",fullPage:true})

})