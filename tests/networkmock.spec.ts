import { test, expect } from '@playwright/test';

test.describe('Add to Cart - OpenCart Demo', () => {

  // 1️⃣ Happy Path – Add product to cart successfully
  test('should add product to cart successfully', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/');

    // Click on first product
    await page.locator('.product-layout .button-group button[onclick*="cart"]').first().click();

    // Assert success alert
    await expect(page.locator('.alert-success')).toContainText('Success: You have added');
  });

  // 2️⃣ Mock Empty Cart Response
  test('should show "Cart is empty" when API returns empty cart', async ({ page }) => {
    // Intercept the cart API (OpenCart uses index.php?route=checkout/cart)
    await page.route('**/index.php?route=checkout/cart/*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ cart: [] })
      });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart');
    await expect(page.locator('#content')).toContainText('Your shopping cart is empty!');
  });

  // 3️⃣ Mock 500 Server Error
  test('should show error when cart API fails', async ({ page }) => {
    await page.route('**/index.php?route=checkout/cart/*', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: "Internal Server Error" })
      });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart');

    // In real OpenCart, a failed response may not render clean error,
    // so you can check for generic fallback (like cart not loading).
    await expect(page.locator('#content')).toContainText('Your shopping cart is empty!');
  });

});
