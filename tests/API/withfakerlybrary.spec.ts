import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

test("Create a post request using faker library", async ({ request }) => {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({min:100,max:5000});
    const depositpaid = faker.datatype.boolean();
    const checkin = DateTime.now().toFormat("yyyy-MM-dd");
    const checkout = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd");
    const additionalneeds = "super bowls";

    const requestBody ={
        firstname: firstname,
        lastname: lastname,
        totalprice:totalprice,
        depositpaid:depositpaid,
        bookingdates:{checkin:checkin,
            checkout:checkout},

        additionalneeds:additionalneeds
    }
    const response=await request.post("/booking",{data:requestBody});
     const responseBody = await response.json();
     console.log(responseBody);
     expect(response.ok()).toBeTruthy();
     expect(response.status()).toBe(200);
     expect(responseBody).toHaveProperty("bookingid");
     expect(responseBody).toHaveProperty("booking");
     expect(responseBody).toHaveProperty("booking.additionalneeds");
    //  validate booking details
    const booking = responseBody.booking;
      expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice:requestBody.totalprice,
        depositpaid:requestBody.depositpaid,
        additionalneeds:requestBody.additionalneeds

      })
      expect(booking.bookingdates).toMatchObject({
        checkin:requestBody.bookingdates.checkin,
        checkout:requestBody.bookingdates.checkout
    })


    });
