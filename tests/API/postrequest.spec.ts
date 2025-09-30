import{test,expect} from '@playwright/test';


test("Post a request with valid data format",async({request})=>{
    // let baseURL ='https://restful-booker.herokuapp.com';
    const requestBody = {
        firstname: "Jim",          // required (string)
        lastname: "Brown",         // required (string)
        totalprice: 1000,          // required (number)
        depositpaid: true,         // required (boolean)
        bookingdates: {            // required (object)
          checkin: "2025-07-01",   // required (date string)
          checkout: "2025-07-05",  // required (date string)
        },
        additionalneeds: "super bowls" // optional (string)
      };
      const response = await request.post("/booking", {
        data: requestBody   // ✅ body goes here
      });
      const responseBody = await response.json();
      console.log(responseBody);
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBeTruthy();
      expect(responseBody).toHaveProperty("bookingid");
      expect(responseBody).toHaveProperty("booking");
      expect(responseBody.booking).toMatchObject({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 1000,
        depositpaid: true,
        bookingdates: { checkin: '2025-07-01', checkout: '2025-07-05' },
        additionalneeds: 'super bowls'
      });
      expect(responseBody.booking.bookingdates).toMatchObject({checkin: '2025-07-01', checkout: '2025-07-05'});
      expect(responseBody.booking).toMatchObject({additionalneeds: 'super bowls'});
      expect(typeof responseBody.bookingid).toBe('number');

})