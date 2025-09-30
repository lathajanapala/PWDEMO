import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test("Create booking using JSON file", async ({ request }) => {
  // 🔹 Load test data from JSON file
  const jsonFile = path.resolve("testdata/post_request_body.json");
  const requestBody = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));

  // 🔹 Send POST request
  const response = await request.post("/booking", {
    data: requestBody,
  });

  // 🔹 Validate status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // 🔹 Parse response
  const responseBody = await response.json();
  console.log(responseBody);

  // 🔹 Validate response body attributes
  expect(responseBody).toHaveProperty("bookingid");
  expect(responseBody).toHaveProperty("booking");
  expect(responseBody).toHaveProperty("booking.additionalneeds");

  // 🔹 Validate booking details
  const booking = responseBody.booking;
  expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    additionalneeds: requestBody.additionalneeds,
  });

  // 🔹 Validate booking dates (nested JSON object)
  expect(booking.bookingdates).toMatchObject({
    checkin: requestBody.bookingdates.checkin,
    checkout: requestBody.bookingdates.checkout,
  });
});
