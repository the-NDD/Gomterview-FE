import { PATH } from '@constants/path';
import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH.WORKBOOK);
});

test.describe('공통 상태', () => {
  test('카테고리 선택시 해당 카테고리의 문제집이 보여야 한다.', async ({
    page,
  }) => {
    const CategoryMenu = page.locator('.category-menu');
    await CategoryMenu.waitFor();
    const menus = await CategoryMenu.getByRole('tab').all();

    for (const menu of menus) {
      await menu.waitFor();
      await menu.click();

      const WorkbookList = page.locator('.workbook-list');
      await WorkbookList.waitFor();

      expect(
        (await WorkbookList.getByRole('listitem').all()).length
      ).toBeGreaterThan(0);
    }
  });
});
