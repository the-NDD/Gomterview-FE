import { PATH, SETTING_PATH } from '@constants/path';
import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH.INTERVIEW_SETTING);
});
test.use({ storageState: 'playwright/.serviceTour/user.json' });

test.describe('듀토리얼이 설정이 안된 상태', () => {
  test('일반적으로 설정을 진행할 수 있다.', async ({ page }) => {
    await test.step('약관 동의 설정 페이지', async () => {
      const Step1NextButton = page.getByRole('button', { name: '다음' });
      await Step1NextButton.waitFor();
      await expect(Step1NextButton).toBeDisabled();

      const AgreeButton = page.getByText('동의 하시겠습니까?');
      await AgreeButton.waitFor();
      await AgreeButton.click();

      await Step1NextButton.click();
    });

    expect(page.url()).toContain(SETTING_PATH.QUESTION);

    await test.step('질문 설정 페이지', async () => {
      const Step2NextButton = page.getByRole('button', { name: '다음' });
      await expect(Step2NextButton).toBeDisabled();

      const Step2Workbook = page.getByText('e2e 테스트를 위한 세트');
      await Step2Workbook.waitFor();
      await Step2Workbook.click();

      const Step2Question = page.getByText(
        '브라우저 렌더링 과정에 대해서 설명해주세요'
      );
      await Step2Question.waitFor();
      await Step2Question.click();
      await Step2NextButton.click();
    });

    expect(page.url()).toContain(SETTING_PATH.RECORD);

    await test.step('녹화 설정 페이지', async () => {
      const Step3NextButton = page.getByRole('button', { name: '다음' });
      await Step3NextButton.waitFor();
      await expect(Step3NextButton).toBeDisabled();

      const NotSaveButton = page.getByText('저장하지 않음');
      await NotSaveButton.waitFor();
      await NotSaveButton.click();

      await Step3NextButton.click();
    });

    expect(page.url()).toContain(SETTING_PATH.CONNECTION);

    await test.step('연결 설정 페이지', async () => {
      const Step4NextButton = page.getByRole('button', { name: '다음' });
      await Step4NextButton.waitFor();
      await expect(Step4NextButton).toBeDisabled();

      await page.waitForTimeout(1000); // 마이크와 카메라 연결 상태 확인을 위한 스크립트 실행

      // 마이크와 카메라 연결 상태 확인을 위한 스크립트 실행
      const devices = await page.evaluate(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const devices = {
          video: stream.getVideoTracks().length > 0,
          audio: stream.getAudioTracks().length > 0,
        };
        stream.getTracks().forEach((track) => track.stop()); // 스트림 정리
        return devices;
      });

      // 마이크와 카메라가 연결되었는지 확인
      expect(devices.video).toBe(true);
      expect(devices.audio).toBe(true);

      await Step4NextButton.click();
    });

    expect(page.url()).toContain(PATH.INTERVIEW);
  });

  test('설정 도중 뒤로가도 설정이 유지된다.', async ({ page }) => {
    const Step1NextButton = page.getByRole('button', { name: '다음' });
    await Step1NextButton.waitFor();

    const AgreeButton = page.getByText('동의 하시겠습니까?');
    await AgreeButton.waitFor();
    await AgreeButton.click();

    await expect(page.getByTestId('setting-page-content')).toHaveScreenshot(
      'step1.png'
    );
    // step1 스냅샷 저장
    await Step1NextButton.click();

    const Step2NextButton = page.getByRole('button', { name: '다음' });
    const Step2Workbook = page.getByText('e2e 테스트를 위한 세트');
    await Step2Workbook.waitFor();
    await Step2Workbook.click();

    const Step2Question = page.getByText(
      '브라우저 렌더링 과정에 대해서 설명해주세요'
    );
    await Step2Question.waitFor();
    await Step2Question.click();

    await expect(page.getByTestId('setting-page-content')).toHaveScreenshot(
      'step2.png'
    );
    await Step2NextButton.click();

    const Step3NextButton = page.getByRole('button', { name: '다음' });
    await Step3NextButton.waitFor();

    const NotSaveButton = page.getByText('저장하지 않음');
    await NotSaveButton.waitFor();
    await NotSaveButton.click();
    await expect(page.getByTestId('setting-page-content')).toHaveScreenshot(
      'step3.png'
    );
    await Step3NextButton.click();

    await page.getByRole('button', { name: '이전' }).click();

    await expect(page.getByTestId('setting-page-content')).toHaveScreenshot(
      'step3.png'
    );

    await page.getByRole('button', { name: '이전' }).click();

    await expect(page.getByTestId('setting-page-content')).toHaveScreenshot(
      'step2.png'
    );
    await page.getByRole('button', { name: '이전' }).click();

    await expect(page.getByTestId('setting-page-content')).toHaveScreenshot(
      'step1.png'
    );
  });
});

test.describe('비회원 상태', () => {
  test('면접 결과를 서버에 저장하는 설정은 사용할 수 없다.', async ({
    page,
  }) => {
    const Step1NextButton = page.getByRole('button', { name: '다음' });
    await Step1NextButton.waitFor();

    const AgreeButton = page.getByText('동의 하시겠습니까?');
    await AgreeButton.waitFor();
    await AgreeButton.click();

    await Step1NextButton.click();

    const Step2NextButton = page.getByRole('button', { name: '다음' });
    const Step2Workbook = page.getByText('e2e 테스트를 위한 세트');
    await Step2Workbook.waitFor();
    await Step2Workbook.click();

    const Step2Question = page.getByText(
      '브라우저 렌더링 과정에 대해서 설명해주세요'
    );
    await Step2Question.waitFor();
    await Step2Question.click();
    await Step2NextButton.click();

    const Step3NextButton = page.getByRole('button', { name: '다음' });
    await Step3NextButton.waitFor();

    const ServerSaveButton = page.getByText('서버에 저장');
    await ServerSaveButton.waitFor();
    await ServerSaveButton.click({ force: true });

    await expect(page.getByText('로그인하러 이동')).toBeVisible();
  });
});

test.describe('회원 상태', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('면접결과를 서버에 저장하는 설정을 할 수 있다.', async ({ page }) => {
    const Step1NextButton = page.getByRole('button', { name: '다음' });
    await Step1NextButton.waitFor();

    const AgreeButton = page.getByText('동의 하시겠습니까?');
    await AgreeButton.waitFor();
    await AgreeButton.click();

    await Step1NextButton.click();

    const Step2NextButton = page.getByRole('button', { name: '다음' });
    const Step2Workbook = page.getByText('e2e 테스트를 위한 세트');
    await Step2Workbook.waitFor();
    await Step2Workbook.click();

    const Step2Question = page.getByText(
      '브라우저 렌더링 과정에 대해서 설명해주세요'
    );
    await Step2Question.waitFor();
    await Step2Question.click();
    await Step2NextButton.click();

    const Step3NextButton = page.getByRole('button', { name: '다음' });
    await Step3NextButton.waitFor();

    const ServerSaveButton = page.getByText('서버에 저장');
    await ServerSaveButton.waitFor();
    await ServerSaveButton.click({ force: true });

    await expect(page.getByText('로그인하러 이동')).not.toBeVisible();
  });
});
