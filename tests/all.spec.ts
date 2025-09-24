import { test,expect,Locator } from "@playwright/test";
test("staticwebtable",async ({page})=>{
    await page.goto("/");
    const allProducts:Locator = page.locator(".product-item h2")
    const arrayoflocators:Locator[] = await allProducts.all();
    for(const locator of arrayoflocators){
        // console.log(await locator.innerText())
            console.log(locator);
        }
    });





