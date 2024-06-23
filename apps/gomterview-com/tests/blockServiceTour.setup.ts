import { test as setup } from '@playwright/test';

const tourFile = 'playwright/.serviceTour/user.json';

setup('block service tour', async ({ page }) => {
  await page.goto('/');
  await page
    .locator('#react-joyride-step-0')
    .getByRole('alertdialog')
    .getByRole('button', { name: 'S-K-I-P' })
    .click();

  await page.context().storageState({ path: tourFile });
});
