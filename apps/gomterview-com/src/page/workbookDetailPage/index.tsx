import { Question } from '@/types/question';
import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import { WorkbookCard } from '@common/index';
import {
  AddWorkbookListModal,
  StartWithSelectedQuestionModal,
  WorkbookDetailPageLayout,
} from '@components/workbookDetailPage';
import { css } from '@emotion/react';
import { Box, Button, CheckBox } from 'gomterview-design-system';
import useQuestionWorkbookQuery from '@/entities/workbook/model/queries/useQuestionWorkbookQuery';
import useWorkbookQuery from '@/entities/workbook/model/queries/useWorkbookQuery';
import useUserInfo from '@hooks/useUserInfo';
import { theme } from '@gomterview/_theme';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from '@gomterview/toast';
import { useModal } from '@gomterview/use-modal';
import { RequestLoginModal } from '@components/common';

const WorkbookDetailPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const { workbookId } = useLoaderData() as { workbookId: number };
  const userInfo = useUserInfo();
  const { data: questionWorkbookData } = useQuestionWorkbookQuery({
    workbookId,
  });
  const { data: workbookData } = useWorkbookQuery({ workbookId: workbookId });

  const {
    openModal: openStartWithSelectedQuestionModal,
    closeModal: closeStartWithSelectedQuestionModal,
  } = useModal(() => (
    <StartWithSelectedQuestionModal
      closeModal={closeStartWithSelectedQuestionModal}
      workbookData={workbookData}
      questions={selectedQuestion}
    />
  ));

  const {
    openModal: openAddWorkbookListModal,
    closeModal: closeAddWorkbookListModal,
  } = useModal(() => (
    <AddWorkbookListModal
      closeModal={closeAddWorkbookListModal}
      selectedQuestionIds={selectedQuestion.map(
        (question) => question.questionId
      )}
      workbookData={workbookData}
    />
  ));

  const selectQuestion = (question: Question) => {
    setSelectedQuestion((prev) =>
      prev.filter((prev) => prev.questionId !== question.questionId)
    );
  };

  const unSelectQuestion = (question: Question) => {
    setSelectedQuestion((prev) => [...prev, question]);
  };

  const allSelectQuestion = () => {
    setSelectedQuestion(questionWorkbookData.map((question) => question) || []);
  };

  const allUnSelectQuestion = () => setSelectedQuestion([]);

  const handleAllSelected = () => {
    allSelected ? allUnSelectQuestion() : allSelectQuestion();
    setAllSelected((prev) => !prev);
  };

  const { closeModal, openModal: openRequestLoginModal } = useModal(() => (
    <RequestLoginModal closeModal={closeModal} />
  ));

  const validateAddWorkbookList = () => {
    if (!userInfo) {
      openRequestLoginModal();
      return false;
    }
    if (selectedQuestion.length < 1) {
      toast.warning('질문을 선택해주세요');
      return false;
    }
    return true;
  };

  return (
    <>
      <WorkbookDetailPageLayout>
        <WorkbookCard
          css={css`
            height: auto;
          `}
          nickname={workbookData.nickname}
          profileImg={workbookData.profileImg}
          copyCount={workbookData.copyCount}
          title={workbookData.title}
          content={workbookData.content}
        />

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
          `}
        >
          <CheckBox
            id="allSelect"
            checked={allSelected}
            onInputChange={handleAllSelected}
          >
            전체 선택하기
          </CheckBox>
          <div
            css={css`
              display: flex;
              gap: 0.3125rem;
            `}
          >
            <Button
              variants="secondary"
              disabled={selectedQuestion.length < 1}
              onClick={openStartWithSelectedQuestionModal}
            >
              면접 시작하기
            </Button>
            <Button
              disabled={selectedQuestion.length < 1}
              onClick={() => {
                validateAddWorkbookList() && openAddWorkbookListModal();
              }}
            >
              질문 가져오기
            </Button>
          </div>
        </div>

        <ul>
          <Box
            css={css`
              display: flex;
              flex-direction: column;
              gap: 1rem;
              padding: 1rem;
              background-color: ${theme.colors.border.weak};
              height: auto;
            `}
          >
            {questionWorkbookData.map((question) => {
              const isSelected = selectedQuestion.includes(question);
              return (
                <li key={question.questionId}>
                  <QuestionAccordion
                    question={question}
                    workbookId={workbookId}
                    isSelected={isSelected}
                    isEditable={false}
                    toggleSelected={() =>
                      isSelected
                        ? selectQuestion(question)
                        : unSelectQuestion(question)
                    }
                  />
                </li>
              );
            })}
          </Box>
        </ul>
      </WorkbookDetailPageLayout>
    </>
  );
};

export default WorkbookDetailPage;
