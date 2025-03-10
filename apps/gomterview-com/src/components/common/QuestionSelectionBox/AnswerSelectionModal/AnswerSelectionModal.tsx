import { css } from '@emotion/react';
import { theme } from '@gomterview/_theme';
import AnswerScript from './AnswerScript';
import AnswerForm from './AnswerForm';
import { Question } from '@/types/question';
import { Modal, Typography } from 'gomterview-design-system';
import { toast } from '@gomterview/toast';
import { useGetAnswerByQuestionIdQuery } from '@/entities/answer/api/queries';
import useAnswerDefaultMutation from '@/entities/answer/model/use-answer-default-mutation';

type AnswerSelectionModalProps = {
  workbookId: number;
  closeModal: () => void;
  question: Question;
};

const AnswerSelectionModal: React.FC<AnswerSelectionModalProps> = ({
  workbookId,
  closeModal,
  question,
}) => {
  const { data } = useGetAnswerByQuestionIdQuery(question.questionId);

  const { mutate: selectAnswerMutate } = useAnswerDefaultMutation(workbookId);

  if (!data) return;

  return (
    <Modal
      isOpen={true}
      closeModal={closeModal}
      css={css`
        width: 40rem;
        @media (max-width: ${theme.breakpoints.tablet}) {
          width: 30rem;
        }
        @media (max-width: ${theme.breakpoints.mobileL}) {
          width: 100%;
          margin: 0 1rem;
        }
      `}
    >
      <Modal.header closeButtonVisible>답변 변경하기</Modal.header>
      <Modal.content>
        <div
          css={css`
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
                      body: {
                        questionId: question.questionId,
                        answerId: answer.answerId,
                      },
                    },
                    {
                      onSuccess: () => {
                        closeModal();
                        toast.success('대표 답변이 변경되었습니다.', {
                          position: 'bottomRight',
                        });
                      },
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
