import { useQueryClient } from '@tanstack/react-query';
import useUserInfo from './useUserInfo';
import { Question } from '@/types/question';
import { usePostQuestionMutation } from '@/entities/question/api/mutations';
import { QUESTION_QUERY_KEY } from '@/entities/question/api/queries';

const useQuestionAdd = ({ onSuccess }: { onSuccess?: () => void }) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate } = usePostQuestionMutation();

  const createNewQuestion = (content: string, lastId: number = 1) => {
    return {
      questionId: lastId - 1,
      questionContent: content,
      answerId: 0,
      answerContent: '',
    };
  };

  const addQuestion = ({
    value,
    workbookId,
  }: {
    value: string;
    workbookId: number;
  }) => {
    if (userInfo) {
      mutate(
        { body: { content: value, workbookId: workbookId } },
        {
          onSuccess: () => onSuccess && onSuccess(),
        }
      );
    } else {
      queryClient.setQueryData<Question[] | []>(
        QUESTION_QUERY_KEY.GET_QUESTION_WORKBOOKID(workbookId),
        (prev) => {
          if (prev?.length === 0 || !prev) return [createNewQuestion(value)];
          return [createNewQuestion(value, prev[0].questionId), ...prev];
        }
      );
      onSuccess && onSuccess();
    }
  };
  return { addQuestion };
};

export default useQuestionAdd;
