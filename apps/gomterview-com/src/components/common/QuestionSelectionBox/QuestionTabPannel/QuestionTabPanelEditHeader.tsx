import { css } from '@emotion/react';
import { Button, Icon, Input, InputArea } from 'gomterview-design-system';
import useCategoryQuery from '@/entities/category/model/queries/useCategoryQuery';
import { WorkbookQueryResult } from '@/entities/workbook/model/queries/useWorkbookQuery';
import useInput from '@hooks/useInput';
import { useState } from 'react';
import QuestionAddForm from './QuestionAddForm';
import useWorkbookEdit from '@hooks/useWorkbookEdit';
import QuestionDropdown from './QuestionDropdown';
import useDebounce from '@hooks/useDebounce';
import { toast } from '@gomterview/toast';

type QuestionTabPanelEditHeaderProps = {
  workbookInfo: WorkbookQueryResult;
  closeEditMode: () => void;
  onQuestionAdd: () => void;
};

const publicMap = [
  {
    id: 'public',
    name: '공개',
    isPublic: true,
  },
  {
    id: 'private',
    name: '비공개',
    isPublic: false,
  },
];

const QuestionTabPanelEditHeader: React.FC<QuestionTabPanelEditHeaderProps> = ({
  workbookInfo,
  closeEditMode,
  onQuestionAdd,
}) => {
  const initialPublicState = publicMap.find(
    (item) => item.isPublic === workbookInfo.isPublic
  ) as (typeof publicMap)[number];
  // publicMap에 boolean 타입의 조건이 모두 들어가 있으므로 undefined는 나올 수 없음 => 강제 타입 변환 사용

  const [selectedPublic, setSelectedPublic] = useState(initialPublicState);
  const [selectedCategory, setSelectedCategory] = useState({
    id: workbookInfo.categoryId,
    name: workbookInfo.categoryName,
  });

  const { data: categoryData } = useCategoryQuery();

  const { value: title, onChange: handleTitleChange } =
    useInput<HTMLInputElement>(workbookInfo.title);
  const { value: content, onChange: handleContentChange } =
    useInput<HTMLTextAreaElement>(workbookInfo.content);

  const { editWorkbook } = useWorkbookEdit({
    onSuccess: () => {
      toast.success('수정에 성공하였습니다.');
    },
  });

  const EditWorkbook = ({
    id,
    title: titleProp,
    content: contentProp,
    categoryId,
    isPublic,
  }: {
    id?: number;
    title?: string;
    content?: string;
    categoryId?: number;
    isPublic?: boolean;
  }) => {
    editWorkbook({
      workbookId: id ?? workbookInfo.workbookId,
      title: titleProp ?? title,
      content: contentProp ?? content,
      categoryId: categoryId ?? selectedCategory.id,
      isPublic: isPublic ?? selectedPublic.isPublic,
    });
  };
  const save = useDebounce(EditWorkbook, 1000);

  if (!categoryData) return;

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          padding: 0.5rem;
          margin-bottom: 0.8rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 0.5rem;
              align-items: center;
            `}
          >
            <QuestionDropdown
              data={categoryData}
              selected={selectedCategory}
              onChange={(e, item) => {
                setSelectedCategory(item);
                save({
                  categoryId: item.id,
                });
              }}
            />
            <QuestionDropdown
              data={publicMap}
              selected={selectedPublic}
              onChange={(e, item) => {
                setSelectedPublic(item);
                save({
                  isPublic: item.isPublic,
                });
              }}
            />
          </div>
          <Button
            onClick={closeEditMode}
            variants="secondary"
            size="sm"
            css={css`
              padding: 0.4rem;
              border: none;
              background-color: inherit;
            `}
          >
            <Icon id="close" />
          </Button>
        </div>
        <Input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleTitleChange(e);
            save({
              title: e.target.value,
            });
          }}
        />
        <InputArea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleContentChange(e);
            save({
              content: e.target.value,
            });
          }}
          rows={2}
        />
      </div>
      <div
        css={css`
          padding: 0 0.5rem;
        `}
      >
        <QuestionAddForm
          workbookId={workbookInfo.workbookId}
          onQuestionAdd={onQuestionAdd}
        />
      </div>
    </>
  );
};

export default QuestionTabPanelEditHeader;
