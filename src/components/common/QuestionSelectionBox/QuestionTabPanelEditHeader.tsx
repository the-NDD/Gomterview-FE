import { css, useTheme } from '@emotion/react';
import {
  Button,
  Icon,
  Input,
  InputArea,
  Menu,
  MenuItem,
  Typography,
} from '@foundation/index';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';
import { WorkbookQueryResult } from '@hooks/apis/queries/useWorkbookQuery';
import useInput from '@hooks/useInput';
import { useState } from 'react';
import QuestionAddForm from './QuestionAddForm';

type QuestionTabPanelEditHeaderProps = {
  workbookInfo: WorkbookQueryResult;
  closeEditMode: () => void;
};
const QuestionTabPanelEditHeader: React.FC<QuestionTabPanelEditHeaderProps> = ({
  workbookInfo,
  closeEditMode,
}) => {
  const theme = useTheme();

  const { data: categoryData } = useCategoryQuery();

  const { value: title, onChange: handleTitleChange } =
    useInput<HTMLInputElement>(workbookInfo.title);
  const { value: content, onChange: handleContentChange } =
    useInput<HTMLTextAreaElement>(workbookInfo.content);

  const [isOpenCategoryMenu, setIsOpenCategoryMenu] = useState(false);
  const toggleCategoryMenu = () => {
    setIsOpenCategoryMenu((prev) => !prev);
  };

  const [isOpenPublicMenu, setIsOpenPublicMenu] = useState(false);
  const togglePublicMenu = () => {
    setIsOpenPublicMenu((prev) => !prev);
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          padding: 0.5rem;
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
            <div
              css={css`
                position: relative;
              `}
            >
              <Button
                css={css`
                  padding: 0.4rem;
                  border-radius: 0.5rem;
                `}
                onClick={toggleCategoryMenu}
              >
                {workbookInfo.categoryName}
                <Icon id="arrow-down" fill={theme.colors.text.white} />
              </Button>
              <Menu open={isOpenCategoryMenu} closeMenu={toggleCategoryMenu}>
                {categoryData?.map((category) => (
                  <MenuItem key={category.id}>
                    <Typography noWrap>{category.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div
              css={css`
                position: relative;
              `}
            >
              <Button
                css={css`
                  padding: 0.4rem;
                  border-radius: 0.5rem;
                `}
                onClick={togglePublicMenu}
              >
                {workbookInfo.isPublic ? '공개' : '비공개'}
                <Icon id="arrow-down" fill={theme.colors.text.white} />
              </Button>
              <Menu open={isOpenPublicMenu} closeMenu={togglePublicMenu}>
                <MenuItem>
                  <Typography noWrap>공개</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography noWrap>비공개</Typography>
                </MenuItem>
              </Menu>
            </div>
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
        <Input value={title} onChange={handleTitleChange} />
        <InputArea value={content} onChange={handleContentChange} rows={2} />
      </div>
      <div
        css={css`
          padding: 0 0.5rem;
        `}
      >
        <QuestionAddForm workbookId={workbookInfo.workbookId} />
      </div>
    </>
  );
};

export default QuestionTabPanelEditHeader;
