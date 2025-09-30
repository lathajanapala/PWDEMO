import{test,expect}from'@playwright/test';
import fs from 'fs';
import { request } from 'http';
function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));

}
test("Update Booking(put)",async({request})=>{
    const requestBody = await readJson('testdata/post_request_body.json');

    const createResponse = await request.post('/booking',{data:requestBody});
    const responseBody = await createResponse.json();
    console.log("responseBody");
    const bookingid = responseBody.bookingid;
    console.log("Booking id ===>",bookingid);
    const tokenrequestBody = await readJson('testdata/token_request_body.json');
    const tokenresponse = await request.post("/auth",{data:tokenrequestBody});
    const tokenresponsebody = await tokenresponse.json();
    const token = tokenresponsebody.token;
    console.log("Token====>",token);
    const updateRequestbody = await readJson("testdata/put_request_body.json");
    const updateresponse = await request.put(`/booking/${bookingid}`,{
        headers:{"cookie":`token=${token}`},
        data:updateRequestbody
    });
    expect(updateresponse.ok()).toBeTruthy();
    expect(updateresponse.status()).toBe(200);
    const updateresponsebody = await updateresponse.json();
    console.log(updateresponsebody);
    console.log("Booking details updated successfully");
})