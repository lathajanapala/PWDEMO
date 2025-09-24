import{test,expect,Locator} from '@playwright/test';
test("Sorted options",async({page})=>{
    await page.goto("/");
    const alloptionstext: string[] = (await page.locator('#colors>option').allTextContents()).map(text=>text.trim());
    // for(const text of alloptionstext){
    //     console.log(text)
    // }
// const originalList: string[] = [...alloptionstext];
// const sortedList: string[] = [...alloptionstext].sort();
// expect(originalList).not.toEqual(sortedList);
const myset = new Set<string>();
const duplicates:string[]=[];
for(const text of alloptionstext){
    if(myset.has(text)){
        duplicates.push(text)
    }
    else{
        myset.add(text)
    }
}

console.log("duplicate options are",duplicates)


})