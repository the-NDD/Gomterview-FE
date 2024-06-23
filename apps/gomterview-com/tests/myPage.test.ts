import test, { expect } from '@playwright/test';
import { API } from '@constants/api';
import { PATH } from '@constants/path';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH.MYPAGE);
});

test.describe('비회원 상태', () => {
  test('페이지 접근시 메인 페이지로 이동한다.', async ({ page }) => {
    await page.waitForTimeout(2000);
    const currentURL = page.url();
    const isMainPage = new URL(currentURL).pathname === '/';

    expect(isMainPage).toBe(true);
  });
});

test.describe('회원 상태', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  test('마이 페이지에서는 2개의 설정을 바꿀 수 있다.', async ({ page }) => {
    const AddQuestionTab = page.getByText('질문 추가');
    const VideoRePlayTab = page.getByText('영상 다시보기');
    await AddQuestionTab.waitFor();
    await VideoRePlayTab.waitFor();

    expect(await AddQuestionTab.isVisible()).toBe(true);
    expect(await VideoRePlayTab.isVisible()).toBe(true);
  });
  test('페이지 진입시 포커스는 영상 다시보기가 되어야 한다.', async ({
    page,
  }) => {
    const VideoTabPanel = page.getByTestId('video-list-tab-panel');
    await VideoTabPanel.waitFor();
    expect(await VideoTabPanel.isVisible()).toBe(true);
  });
  test('질문 추가 탭을 선택하면 질문 추가 화면이 보여야 한다.', async ({
    page,
  }) => {
    await page.getByText('질문 추가').click();
    await page.waitForResponse((res) => res.url().includes(API.WORKBOOK_TITLE));
    await page.waitForResponse((res) => res.url().includes(API.CATEGORY));
    expect(await page.getByTestId('question-selection-box').isVisible()).toBe(
      true
    );
  });
});
