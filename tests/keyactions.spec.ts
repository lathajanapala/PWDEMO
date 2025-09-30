import { expect,test,Locator} from "@playwright/test";
test("[@regression] keyboard actions test ",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");






    //  ctrl TAB - 2 times
    //  ctrl v - this wil paste the input text in the textbox3

//    const input1 = page.locator("#input1");
//    // focus on input box 1
//    await input1.focus();
//    // provide the text in input1
//    await page.keyboard.insertText("Helloooo");
//    // ctrl +A-select the text
//    await page.keyboard.press('Control+A');
//     // ctrl +C-select the text
//    await page.keyboard.press('Control+C');

//    //  press TAB- 2 times
//    await page.keyboard.press('Tab');
//    await page.keyboard.press('Tab');
//    await page.waitForTimeout(5000)
//    // ctrl v- this will paste the input text in text box2
//    await page.keyboard.press('Control+V')

//    await page.keyboard.press('Tab');
//    await page.keyboard.press('Tab');
//    await page.waitForTimeout(5000)
//    // ctrl v- this will paste the input text in text box2
//    await page.keyboard.press('Control+V')
//    await page.waitForTimeout(5000)

//    await page.screenshot({path: 'screenshots/page.png'});

const input1 = page.locator("#input1");
   // focus on input box 1
   await input1.focus();
   // provide the text in input1
   await page.keyboard.insertText("Helloooo");
   // ctrl +A-select the text
   await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
   // ctrl +C-copy the text
   await page.keyboard.press(process.platform === 'darwin' ? 'Meta+C' : 'Control+C');

   // press TAB to navigate to the second input field
   await page.keyboard.press('Tab');
   await page.keyboard.press('Tab');

//    const input2 = page.locator("#input2"); // Ensure selector matches the DOM
//    await input2.focus();
   // ctrl +V-paste the text into the second input field
   await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');

   // press TAB to navigate to the third input field
   await page.keyboard.press('Tab');
   await page.keyboard.press('Tab');

//    const input3 = page.locator("#input3"); // Ensure selector matches the DOM
//    await input3.focus();
   // ctrl +V-paste the text into the third input field
await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
// Increase timeout for stability

   await page.screenshot({path: 'screenshots/page.png'});



})