import { test, expect } from '@playwright/test';

test('Get booking details by bookingId', async ({ request }) => {
    const baseURL = 'https://restful-booker.herokuapp.com';
    const bookingId = 1;

    // Correct: use bookingId in the path
    const response = await request.get(`${baseURL}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    // The booking details object does not include bookingId,
    // so assert its fields instead
    expect(body).toHaveProperty('firstname', 'Jim');
    expect(body).toHaveProperty('lastname', 'Ericsson');
});
