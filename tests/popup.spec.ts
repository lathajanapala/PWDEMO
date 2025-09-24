import{test,expect,Page} from'@playwright/test';
test("Multiple popup windows testting",async({browser})=>{
   const context =await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://testautomationpractice.blogspot.com/");
   const [popup] = await Promise.all([
    page.waitForEvent('popup'),   // waits for new tab/window
    page.locator("#PopUp").click() // no await here inside Promise.all
  ]);
  await popup.waitForLoadState();
  console.log("✅ Popup opened:", popup.url())
   const allPages = context.pages();
   console.log("Number of pages are",allPages.length)
   const seleniumPage = allPages.find(p => p.url().includes("selenium.dev"));
   console.log("✅ Selenium page URL:",seleniumPage?.url());
 console.log("✅ Selenium page title:", await seleniumPage?.title());
//    console.log(seleniumPage ? seleniumPage : "Selenium page not found")
// find Playwright tab
const playwrightPage = allPages.find(p => p.url().includes("playwright.dev"));
console.log("✅ Playwright page URL:", playwrightPage?.url());
console.log("✅ Playwright page title:",await playwrightPage?.title());

// assert URLs
await expect(seleniumPage!).toHaveURL("https://www.selenium.dev/");
await expect(playwrightPage!).toHaveURL("https://playwright.dev/");
   if (playwrightPage) {
       await playwrightPage.locator(".getStarted_Sjon").click();
   } else {
       throw new Error("Playwright page not found");
   }
   await expect(playwrightPage.getByRole('heading', { level: 2, name: 'Introduction' }))
  .toBeVisible();


})