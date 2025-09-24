import{test,expect,Locator}from '@playwright/test';

test("Verify Chrome CPU in dynamic webtable",async({page})=>{
    await page.goto("/");
    const table:Locator= page.locator("table[id='taskTable']")

   await expect(table).toBeVisible();
   const headers:string[]= await table.locator("thead tr th").allInnerTexts();

   const cpuIndex = headers.findIndex(h=>h.includes("CPU"))+1;
   const chromeRow = table.locator("tbody tr",{hasText:"Chrome"});
   const cpuValue = await chromeRow.locator(`td:nth-child(${cpuIndex})`).innerText();
   console.log(`CPU% for Chrome =${cpuValue}`);
})
test("Verify Memorisize of the Firefox process:",async({page})=>{
    await page.goto("/");
    const table:Locator = page.locator("table[id='taskTable']");
    const headers :string[]=await table.locator("thead tr th").allInnerTexts();

    const firefoxrow:Locator = table.locator("tbody tr",{hasText:'Firefox'});
    const memorySizeindex:number = headers.findIndex(h=>h.includes("Memory (MB)"))+1;
    const memoryValue:string=await firefoxrow.locator(`td:nth-child(${memorySizeindex})`).innerText();
    console.log(`Memory Size of FireFox process is: ${memoryValue}`);
   })


