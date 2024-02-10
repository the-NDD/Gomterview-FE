import { CheckBox } from '@foundation/index';
import QuestionSelectionBoxAccordion from '@common/QuestionSelectionBox/QuestionSelectionBoxAccordion';
import WorkbookEditModeDialog from '@common/QuestionSelectionBox/WorkbookEditModeDialog';
import useWorkbookQuestionDelete from '@hooks/useWorkbookQuestionDelete';
import { Question } from '@/types/question';
import { css } from '@emotion/react';

type QuestionAccordionListProps = {
  isEditMode: boolean;
  cancelEditMode: () => void;
  questionData?: Question[];
  workbookId: number;
};
const QuestionAccordionList: React.FC<QuestionAccordionListProps> = ({
  isEditMode,
  questionData,
  workbookId,
}) => {
  const {
    addCheckedQuestion,
    deleteCheckedQuestion,
    isCheckedQuestion,
    checkQuestionCount,
  } = useWorkbookQuestionDelete(workbookId);

  const handleQuestionChecked = (questionId: number) => {
    isEditMode && addCheckedQuestion(questionId);
  };

  const handleDeleteQuestion = async () => {
    await deleteCheckedQuestion();
  };

  const getServiceStepID = (index: number, length: number) => {
    return length < 7
      ? index === length - 1
        ? 'virtual-step-target-0'
        : ''
      : index === length - 4
        ? 'virtual-step-target-0'
        : '';
  };
  if (!questionData) return <></>;

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.2rem;
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          height: 100%;
        `}
      >
        {questionData.map((question, index) => (
          <div
            key={question.questionId}
            onClick={() => handleQuestionChecked(question.questionId)}
            css={css`
              display: flex;
              align-items: center;
              column-gap: 0.5rem;
              margin-bottom: ${index === questionData.length - 1
                ? '2.5rem'
                : '0'};
            `}
          >
            {isEditMode && (
              <CheckBox
                id={`question-${question.questionId}`}
                checked={isCheckedQuestion(question.questionId)}
                onInputChange={() => handleQuestionChecked(question.questionId)}
              />
            )}
            <div
              id={getServiceStepID(index, questionData.length)} // 현재 QuestionBox의 UI 수정이 이루어 지지 않았습니다. 매우 특수한 경우로 예외처리 합니다
              css={css`
                width: 100%;
              `}
            >
              <QuestionSelectionBoxAccordion
                key={question.questionId}
                question={question}
                workbookId={workbookId}
                isSelectable={!isEditMode}
              />
            </div>
          </div>
        ))}
        {isEditMode && (
          <WorkbookEditModeDialog
            count={checkQuestionCount()}
            onDeleteClick={() => void handleDeleteQuestion()}
          />
        )}
      </div>
    </>
  );
};

export default QuestionAccordionList;
