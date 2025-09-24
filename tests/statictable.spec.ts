import{test,Locator, expect} from '@playwright/test';
test("Capture all the rows data from the tale",async({page})=>{
    await page.goto("/");
    const table:Locator = page.locator("table[name='BookTable'] tbody");
    const rows:Locator =table.locator("tr:has(td)");
     await expect(rows).toHaveCount(6);
    const rowsArray:Locator[] = await rows.all();
    // console.log(rows);
    // expect(rows).toBe(7)
    //
    let count = 0;
    for(const row of rowsArray){
        const cells: string[]=await row.locator("td").allInnerTexts();
        console.log(cells.join(" | "));

        const author   = cells[1];   // 2nd column = Author

    if (author === "Mukesh") {
      count++;
    }
    // await expect(rowsArray[1].locator("td").allInnerTexts()).resolves.toEqual([
    //     "Learn Java",
    //     "Mukesh",
    //     "Java",
    //     "500"
    //     // Add all expected cell values for the 2nd row here
    // ]);
  }
  console.log(`Mukesh wrote ${count} books`)
});