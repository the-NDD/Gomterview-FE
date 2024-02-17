import useUserInfo from '@hooks/useUserInfo';
import { useState } from 'react';
import useDeleteQuestionMutation from '@hooks/apis/mutations/useDeleteQuestionMutation';
import { useRecoilState } from 'recoil';
import { questionSetting } from '@atoms/interviewSetting';
import { QUERY_KEY } from '@constants/queryKey';
import { Question } from '@/types/question';
import { useQueryClient } from '@tanstack/react-query';
import useQuestionWorkbookQuery from './apis/queries/useQuestionWorkbookQuery';
import useWorkbookQuery from './apis/queries/useWorkbookQuery';
import useWorkbookEdit from './useWorkbookEdit';
import { toast } from '@foundation/Toast/toast';

const useWorkbookQuestionDelete = (workbookId: number) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();
  const [, setSelectedQuestions] = useRecoilState(questionSetting);
  const { mutateAsync: deleteQuestionAsync } = useDeleteQuestionMutation();

  const [checkedQuestion, setCheckedQuestion] = useState<number[]>([]);

  const { data: questions } = useQuestionWorkbookQuery({
    workbookId: workbookId,
  });
  const { data: workbookInfo } = useWorkbookQuery({
    workbookId: workbookId,
  });

  const { editWorkbook } = useWorkbookEdit({
    onSuccess: () => {
      toast.info(
        '질문들이 모두 제거 되어 해당 문제집 비공개로 전환되었습니다.'
      );
    },
  });

  const deleteServerQuestion = async () => {
    await Promise.all(
      checkedQuestion.map((questionId) => {
        return deleteQuestionAsync(questionId);
      })
    );
    if (questions.length === checkedQuestion.length) {
      editWorkbook({
        workbookId: workbookId,
        title: workbookInfo.title,
        content: workbookInfo.content,
        categoryId: workbookInfo.categoryId,
        isPublic: false,
      });
    }
    void queryClient.invalidateQueries({
      queryKey: QUERY_KEY.QUESTION_WORKBOOK(workbookId),
    });
  };

  const deleteStateQuestion = () => {
    queryClient.setQueryData<Question[]>(
      QUERY_KEY.QUESTION_WORKBOOK(workbookId),
      (prev) => {
        return prev?.filter(
          (item) => !checkedQuestion.includes(item.questionId)
        );
      }
    );
  };

  const removeCheckedQuestionFromSelectedQuestion = () => {
    setSelectedQuestions((prev) => {
      const selectedQuestions = prev.selectedData.filter(
        (question) => !checkedQuestion.includes(question.questionId)
      );
      return {
        isSuccess: selectedQuestions.length >= 1,
        selectedData: selectedQuestions,
      };
    });
  };

  const addCheckedQuestion = (questionId: number) => {
    setCheckedQuestion((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const resetCheckedQuestion = () => {
    setCheckedQuestion([]);
  };

  const deleteCheckedQuestion = async () => {
    userInfo ? await deleteServerQuestion() : deleteStateQuestion();
    removeCheckedQuestionFromSelectedQuestion();
  };

  const isCheckedQuestion = (questionId: number) => {
    return checkedQuestion.includes(questionId);
  };

  const checkQuestionCount = () => {
    return checkedQuestion.length;
  };

  return {
    addCheckedQuestion,
    resetCheckedQuestion,
    deleteCheckedQuestion,
    isCheckedQuestion,
    checkQuestionCount,
  };
};

export default useWorkbookQuestionDelete;
