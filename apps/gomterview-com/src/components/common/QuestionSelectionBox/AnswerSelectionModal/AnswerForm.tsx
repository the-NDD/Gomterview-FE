import useInput from '@hooks/useInput';
import { css } from '@emotion/react';
import { Box, Button, InputArea, Typography } from 'gomterview-design-system';
import { toast } from '@gomterview/toast';
import { usePostAnswerMutation } from '@/entities/answer/api/mutations';

type AnswerFormProps = {
  questionId: number;
  question: string;
};

const AnswerForm: React.FC<AnswerFormProps> = ({ questionId, question }) => {
  const {
    value: customAnswer,
    onChange: handleCustomAnswerChange,
    isEmpty: isCustomAnswerEmpty,
    clearInput: clearCustomAnswer,
  } = useInput<HTMLTextAreaElement>('');
  const { mutate } = usePostAnswerMutation();

  const handleCustomAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCustomAnswerEmpty()) return;

    mutate(
      {
        body: {
          questionId,
          content: customAnswer,
        },
      },
      {
        onSuccess: () => {
          clearCustomAnswer();
          toast.success('답변 추가에 성공했습니다.', {
            position: 'bottomRight',
          });
        },
      }
    );
  };

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
      `}
      onSubmit={handleCustomAnswerSubmit}
    >
      <Box
        css={css`
          padding: 1rem;
          margin-bottom: 1.5rem;
        `}
      >
        <Typography>{question}</Typography>
      </Box>

      <InputArea onChange={handleCustomAnswerChange} value={customAnswer} />
      <Button
        type="submit"
        size="sm"
        css={css`
          margin-top: 1rem;
          margin-left: auto;
        `}
      >
        답변 추가하기
      </Button>
    </form>
  );
};

export default AnswerForm;
