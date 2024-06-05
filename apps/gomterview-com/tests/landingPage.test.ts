import { PATH, SETTING_PATH } from '@constants/path';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('비회원 상태', () => {
  test('로그인 버튼과 비회원으로 시작하기 버튼이 보여야 한다', async ({
    page,
  }) => {
    const NonMemberStartButton = page.locator(
      'button:has-text("비회원으로 시작하기")'
    );
    await NonMemberStartButton.waitFor();
    expect(await NonMemberStartButton.isVisible()).toBe(true);

    const GoogleStartButton = page.locator(
      'button:has-text("Google로 시작하기")'
    );
    await GoogleStartButton.waitFor();
    expect(await GoogleStartButton.isVisible()).toBe(true);
  });

  test('튜토리얼이 스킵 되었으면 듀토리얼 시작하기 버튼이 보이도록 해야한다.', async ({
    page,
  }) => {
    await page
      .locator('#react-joyride-step-0')
      .getByRole('alertdialog')
      .getByRole('button', { name: 'S-K-I-P' })
      .click();

    expect(
      await page.locator('button:has-text("튜토리얼 시작하기")').isVisible()
    ).toBe(true);
  });

  test('메인 페이지 듀토리얼이 동작한다.', async ({ page }) => {
    const ServiceTourStartDialog = page
      .locator('#react-joyride-step-0')
      .getByRole('alertdialog');
    await ServiceTourStartDialog.waitFor();

    expect(await ServiceTourStartDialog.isVisible()).toBe(true);
    await ServiceTourStartDialog.getByRole('button', { name: 'Next' }).click();

    const ServiceTourStep1 = page
      .locator('#react-joyride-step-1')
      .getByRole('alertdialog');

    await ServiceTourStep1.waitFor();
    expect(await ServiceTourStep1.isVisible()).toBe(true);

    //TODO: overlay에 가려진 요소는 hover후 click을 진행해야 동작함
    const ServiceTourTarget1 = page
      .locator('#virtual-step-target-1')
      .getByRole('link');
    await ServiceTourTarget1.hover({
      force: true,
    });
    await ServiceTourTarget1.click({
      force: true,
    });

    await page.waitForURL(
      `${PATH.INTERVIEW_SETTING}?page=${SETTING_PATH.TERMS}`
    );
    expect(page.url()).toContain(
      `${PATH.INTERVIEW_SETTING}?page=${SETTING_PATH.TERMS}`
    );
  });
});

test.describe('회원 상태', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  test("로그인 상태에는 'Google로 시작하기' 버튼이 보이지 않고 면접 연습 시작하기 버튼이 보여야 한다.", async ({
    page,
  }) => {
    const GoogleStartButton = page.locator(
      'button:has-text("Google로 시작하기")'
    );
    expect(await GoogleStartButton.isVisible()).toBe(false);

    const InterviewStartButton = page.locator(
      'button:has-text("면접 연습 시작하기")'
    );
    await InterviewStartButton.waitFor();
    expect(await InterviewStartButton.isVisible()).toBe(true);
  });

  test('듀토리얼이 스킵 되었으면 듀토리얼 시작하기 버튼이 보이도록 해야한다.', async ({
    page,
  }) => {
    const TutorialStartButton = page.locator(
      'button:has-text("튜토리얼 시작하기")'
    );
    await TutorialStartButton.waitFor();
    expect(await TutorialStartButton.isVisible()).toBe(true);
  });
});
