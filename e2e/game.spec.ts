import { test, expect } from '@playwright/test';

test('create game', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Crazy 8's/);
});

