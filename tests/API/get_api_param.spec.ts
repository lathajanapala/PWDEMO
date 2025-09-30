import { test, expect } from '@playwright/test';
import { request } from 'http';
test("Get booking details by id-param", async ({ request }) => {
    const bookingId = 1;
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toHaveProperty("lastname");
    expect(responseBody).toHaveProperty("totalprice");

    expect(responseBody).toHaveProperty("bookingdates");
    expect(responseBody).toHaveProperty("depositpaid");
})
test("Get booking details by name query param", async ({ request }) => {
    const firstname = 'Mark';
    const lastname = 'Brown';

    const response = await request.get(`/booking?firstname = ${firstname}&lastname=${lastname}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(Array.isArray(responseBody)).toBeTruthy();
    console.log(responseBody[0]);
    expect(responseBody[0]).toHaveProperty("bookingid");
    if (responseBody.length > 0) {
        const bookingId = responseBody[0].bookingid;
        const bookingResponse = await request.get(`/booking/${bookingId}`);
        expect(bookingResponse.status()).toBe(200);
        const bookingDetails = await bookingResponse.json();




    expect(bookingDetails).toHaveProperty("firstname");
    expect(bookingDetails).toHaveProperty("lastname");
    expect(bookingDetails).toHaveProperty("totalprice");

    expect(bookingDetails).toHaveProperty("bookingdates");
    expect(bookingDetails).toHaveProperty("depositpaid");
    }
})