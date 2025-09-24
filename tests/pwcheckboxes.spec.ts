import{test,expect,Locator} from '@playwright/test';
test("This is testing Check boxes option",async ({page})=>{
    await page.goto("/");
    // const checkBox = page.getByLabel('Sunday');
    // await checkBox.check();
    // expect(checkBox).toBeChecked();
    const days:string[]= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkBoxes :Locator[] = days.map(day=>page.getByLabel(day));
    await page.screenshot({ path: 'tests/screenshots/checkboxesbefore.png', });
    expect(checkBoxes.length).toBe(7);

    // select all the checkboxes
//     for(const checkbox of checkBoxes){
//         await checkbox.check();

//         await expect(checkbox).toBeChecked();
//     }
//     await page.screenshot({ path: 'tests/screenshots/checkboxesafter.png' });
//     await page.waitForTimeout(3000);

// for(const checkbox of checkBoxes.slice(-4)){
//         await checkbox.uncheck();

//         await expect(checkbox).not.toBeChecked();
//     }
//     await page.screenshot({ path: 'tests/screenshots/checkboxesafteruncheck.png' });
//     for(const checkbox of checkBoxes.slice(0,3)){
//         await checkbox.uncheck();

//         await expect(checkbox).not.toBeChecked();
//     }
//     await page.screenshot({ path: 'tests/screenshots/checkboxesafteruncheck3.png' });

    // for(const checkbox of checkBoxes){
    //     if(await checkbox.isChecked()){
    //         await checkbox.uncheck()
    //         await expect(checkbox).not.toBeChecked()
    //     }else{
    //         await checkbox.check()
    //         await expect(checkbox).toBeChecked()

    //     }
    // }
    // randomly select checkboxes

 const indexes:number[]=[1,4,6];
 for(const i of indexes){
    await checkBoxes[i].check();
    await expect(checkBoxes[i]).toBeChecked();
    await page.screenshot({ path: 'tests/screenshots/checkboxesafteruncheck4.png' });
 }
 const weekname:string = "Friday"
 for(const day of days){
    if(day.toLowerCase()=== weekname.toLowerCase()){
       await (page.getByLabel(day)).check();
       await page.screenshot({ path: 'tests/screenshots/checkboxesafteruncheck5.png' });
    }
 }


})



