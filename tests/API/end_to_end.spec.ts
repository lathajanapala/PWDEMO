import{test,expect}from'@playwright/test'
import fs from 'fs';
import { request } from 'http';
function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}

test("Create request,get id from response put request,patchrequest and delete request",async({request})=>{
    const requestBody = await readJson("testdata/post_request_body.json");
    const response = await request.post('/booking',{data:requestBody});
    const responseBody = await response.json();
    const bookingId = await responseBody.bookingid;
    console.log('bookinId');

    const getresponse = await request.get(`/booking/${bookingId}`);
    const getresponseBody = await getresponse.json();
    expect(getresponse.ok()).toBeTruthy();
    expect(getresponse.status()).toBe(200);
    console.log(getresponseBody);
    const booking = getresponseBody.booking;

    expect(getresponseBody).toHaveProperty("firstname");
    expect(getresponseBody).toHaveProperty("lastname");
    expect(getresponseBody).toHaveProperty("totalprice");
    expect(getresponseBody).toHaveProperty("depositpaid")

    expect(getresponseBody).toHaveProperty("bookingdates");
    expect(getresponseBody).toHaveProperty("additionalneeds");


    const tokenrequestBody = await readJson("testdata/token_request_body.json");
    const authResponse = await request.post("/auth",{data:tokenrequestBody});
    const authResponseBody = await authResponse.json();
    const authtoken = await authResponseBody.token;
    const updateRequestbody = await readJson("testdata/put_request_body.json");
    const updateresponse = await request.put(`/booking/${bookingId}`,
                                            { headers: { Cookie: `token=${authtoken}` },
                                            data: updateRequestbody });


    //                                         const updateresponse = await request.put(`/booking/${bookingId}`, {
    //                                             headers: {
    //                                               Authorization: `Basic ${Buffer.from("admin:password123").toString("base64")}`
    //                                             }
    //
    //                                           });


    expect(updateresponse.ok()).toBeTruthy();
    expect(updateresponse.status()).toBe(200);
    const updateresponsebody = await updateresponse.json();
    console.log(updateRequestbody);


    const deleteresponse = await request.delete(`/booking/${bookingId}`, {
        headers: { Cookie: `token=${authtoken}` }
    });

    expect(deleteresponse.ok()).toBeTruthy();
    expect(deleteresponse.statusText).toBe("Created")
    expect(deleteresponse.status()).toBe(201);
    console.log(`Booking with ID ${bookingId} has been deleted.`);





})