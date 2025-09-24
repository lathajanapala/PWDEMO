import{test,expect,Locator} from"@playwright/test";
test("Read dat from all the pages in the  pagination table",async({page})=>{
    await page.goto("/");
    const table:Locator = page.locator("table[id='productTable']");
    const paginationLinks = page.locator(".table-container .pagination li")
    const totalpages = await paginationLinks.count();
    for(let p=1; p<totalpages; p++){
        await paginationLinks.nth(p).click();
        await expect(table).toBeVisible();
        const rows:Locator[] = await table.locator("tbody tr").all();
        for(const row of rows){
            const namecell = await row.locator("td:nth-child(2)").innerText();
            if(namecell.trim()==="Soundbar"){
                console.log("Print the name of the cell:",namecell)
            }
    }
   

    }



})