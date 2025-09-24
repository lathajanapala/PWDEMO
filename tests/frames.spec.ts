import{test,expect,Locator} from'@playwright/test'
import { Frame } from '@playwright/test';
test("Frames demo", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/")
    const frames: Frame[] = page.frames();
    console.log("Num of Frames",frames.length)
    // const targetFrame = frames.find(frame => frame.url() === "https://ui.vision/demo/webtest/frames/frame_1.html");
    // if (targetFrame) {
    //     console.log("Target frame found:", targetFrame.url());
    // } else {
    //     console.log("Target frame not found.");
    // }
    const frame = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"})
    if(frame){
        // await frame.locator("[name='mytext1']").fill("Hello");
        await frame.fill("[name='mytext1']","Hello")
        await page.screenshot({ path: "screenshots/frames1.png" })

    }
    else{
        console.log("frame is not available");
    }
});
