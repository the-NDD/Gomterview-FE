import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page
    .locator('#react-joyride-step-0')
    .getByRole('alertdialog')
    .getByRole('button', { name: 'S-K-I-P' })
    .click();
  await page
    .locator('button:has-text("Google로 시작하기")')
    .hover({ force: true });
  await page
    .locator('button:has-text("Google로 시작하기")')
    .click({ force: true });

  await page.waitForTimeout(2000);

  await page.context().storageState({ path: authFile });
});
