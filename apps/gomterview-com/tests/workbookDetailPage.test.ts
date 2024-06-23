import { PATH, SETTING_PATH } from '@constants/path';
import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH.INTERVIEW_WORKBOOK_DETAIL(174));
  // TODO: 테스트 코드를 위한 게시글
});

test.describe('공통 상태', () => {
  test('문제집 전체 선택하기를 통해 모든 문제를 선택할 수 있어야 한다.', async ({
    page,
  }) => {
    await page.getByText('e2e 테스트를 위한 세트').waitFor();
    const QuestionAccordions = await page
      .getByRole('listitem')
      .getByTestId('question-accordion')
      .getByRole('button')
      .all();

    for (const Accordion of QuestionAccordions) {
      await Accordion.waitFor();
      await expect(Accordion).toHaveCSS(
        'background-color',
        'rgb(255, 255, 255)'
      );
    }

    const AllSelect = page.getByText('전체 선택하기');
    await AllSelect.waitFor();
    await AllSelect.click();

    for (const question of QuestionAccordions) {
      await question.waitFor();
      await expect(question).toHaveCSS('background-color', 'rgb(71, 85, 149)');
    }
  });

  test('문제 선택을 해야 면접 시작하기 질문 가져오기 버튼이 활성화가 된다.', async ({
    page,
  }) => {
    const StartInterviewButton = page.getByText('면접 시작하기');
    const GetQuestionButton = page.getByText('질문 가져오기');

    await StartInterviewButton.waitFor();
    await GetQuestionButton.waitFor();

    await expect(StartInterviewButton).toBeDisabled();
    await expect(GetQuestionButton).toBeDisabled();

    await page.getByText('브라우저 렌더링 과정에 대해서 설명해주세요').click();

    await expect(StartInterviewButton).toBeEnabled();
    await expect(GetQuestionButton).toBeEnabled();
  });

  test('면접 시작하기 버튼을 통해 면접을 바로 시작할 수 있어야 한다.', async ({
    page,
  }) => {
    const StartInterviewButton = page.getByText('면접 시작하기');
    await StartInterviewButton.waitFor();

    await page.getByText('브라우저 렌더링 과정에 대해서 설명해주세요').click();
    await StartInterviewButton.click();

    await page.getByText('동의 하시겠습니까?').click();
    await page.getByRole('button', { name: '다음' }).click();

    expect(page.url()).toContain(
      `${PATH.INTERVIEW_SETTING}?page=${SETTING_PATH.RECORD}`
    );
  });
});

test.describe('비회원 상태', () => {
  test('질문을 가져오려면 로그인 창이 나타나야 한다.', async ({ page }) => {
    const GetQuestionButton = page.getByText('질문 가져오기');
    await GetQuestionButton.waitFor();

    await page.getByText('브라우저 렌더링 과정에 대해서 설명해주세요').click();

    await GetQuestionButton.click();

    await expect(page.getByText('로그인하러 이동')).toBeVisible();
  });
});

test.describe('회원 상태', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('질문을 새로운 면접세트로 만들어서 가져올 수 있다.', async ({
    page,
  }) => {
    const GetQuestionButton = page.getByText('질문 가져오기');
    await GetQuestionButton.waitFor();

    await page.getByText('브라우저 렌더링 과정에 대해서 설명해주세요').click();
    await GetQuestionButton.click();

    const CreateNewWorkbook = page.getByText('새로운 면접 세트 만들기');
    await CreateNewWorkbook.waitFor();
    await CreateNewWorkbook.click();

    const NewCopiedWorkbook = page.getByText('e2e 테스트를 위한 세트 복사본');
    await NewCopiedWorkbook.waitFor();
    await expect(NewCopiedWorkbook).toBeVisible();
  });

  test('질문을 기존에 있는 면접 세트에 추가할 수 있다.', async ({ page }) => {
    const GetQuestionButton = page.getByText('질문 가져오기');
    await GetQuestionButton.waitFor();

    await page.getByText('브라우저 렌더링 과정에 대해서 설명해주세요').click();
    await GetQuestionButton.click();

    await page.getByText('기존에 있던 면접 세트').click();
    await page.getByRole('button', { name: '추가' }).click();

    await page.getByText('기존에 있던 면접 세트').click();

    await expect(
      page.getByText('브라우저 렌더링 과정에 대해서 설명해주세요')
    ).toBeVisible();
  });

  test.afterAll('테스트용 데이터 삭제', async ({ browser }) => {
    const page = await browser.newPage();

    await page.goto(PATH.MYPAGE);
    await page.getByText('질문 추가').click();

    const CopyWorkbook = await page
      .getByText('e2e 테스트를 위한 세트 복사본')
      .all();
    for (const workbook of CopyWorkbook) {
      await workbook.waitFor();
      await workbook.click();
    }

    const Menu = page.locator('button[aria-label="더보기"]');
    await Menu.waitFor();
    await Menu.click();
    await page
      .getByRole('menuitem')
      .filter({ hasText: '면접 세트 삭제' })
      .click();

    await page.getByText('기존에 있던 면접 세트').click();
    await Menu.click();
    await page
      .getByRole('menuitem')
      .filter({ hasText: '면접 세트 편집' })
      .click();

    const DeleteTarget = await page
      .getByText('브라우저 렌더링 과정에 대해서 설명해주세요')
      .all();

    for (const target of DeleteTarget) {
      await target.waitFor();
      await target.click();
    }
    await page.locator('button[aria-label="삭제"]').click();
  });
});
