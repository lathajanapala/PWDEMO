import{test,expect}from'@playwright/test';
import { request } from 'http';
test("Get booking details by id-pathparam",async({request})=>{
    const bookingid ='1';
    //send get request
    const response = await request.get(`/booking/${bookingid}`);
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log(responseBody);

    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toHaveProperty("lastname");
    expect(responseBody).toHaveProperty("totalprice");
    expect(responseBody).toHaveProperty("depositpaid")

    expect(responseBody).toHaveProperty("bookingdates");
    expect(responseBody).toHaveProperty("additionalneeds");




})