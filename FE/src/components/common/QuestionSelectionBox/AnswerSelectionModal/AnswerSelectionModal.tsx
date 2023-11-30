import Modal from '@foundation/Modal';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import useQuestionAnswerQuery from '@/hooks/apis/queries/useQuestionAnswerQuery';
import AnswerScript from './AnswerScript';
import AnswerForm from './AnswerForm';
import useAnswerDefaultMutation from '@/hooks/apis/mutations/useAnswerDefaultMutation';
import { Question } from '@/types/question';
import { Typography } from '@foundation/index';

type AnswerSelectionModalProps = {
  isOpen: boolean;
  workbookId: number;
  closeModal: () => void;
  question: Question;
};

const AnswerSelectionModal: React.FC<AnswerSelectionModalProps> = ({
  isOpen,
  workbookId,
  closeModal,
  question,
}) => {
  const { data } = useQuestionAnswerQuery(question.questionId);

  const { mutate: selectAnswerMutate } = useAnswerDefaultMutation(workbookId);

  if (!data) return;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.header closeButtonVisible>답변 변경하기</Modal.header>
      <Modal.content>
        <div
          css={css`
            max-width: 40rem;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
          `}
        >
          <AnswerForm
            question={question.questionContent}
            questionId={question.questionId}
          />
          <div
            css={css`
              display: flex;
              gap: 1.8rem 0.5rem;
              flex-direction: column;
            `}
          >
            <Typography color={theme.colors.text.subStrong}>
              {data.length}개의 스크립트
            </Typography>
            {data.map((answer) => (
              <AnswerScript
                key={answer.answerId}
                answer={answer}
                onClick={() =>
                  selectAnswerMutate(
                    {
                      questionId: question.questionId,
                      answerId: answer.answerId,
                    },
                    {
                      onSuccess: () => closeModal(),
                    }
                  )
                }
              />
            ))}
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default AnswerSelectionModal;