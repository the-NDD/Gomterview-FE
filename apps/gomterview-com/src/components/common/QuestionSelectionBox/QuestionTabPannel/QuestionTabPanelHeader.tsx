import { css, useTheme } from '@emotion/react';
import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Typography,
  Chip,
} from 'gomterview-design-system';
import { useState } from 'react';
import useWorkbookDelete from '@hooks/useWorkbookDelete';
import { toast } from '@gomterview/toast';
import { WorkbookQueryResult } from '@hooks/apis/queries/useWorkbookQuery';

type QuestionTabPanelHeaderProps = {
  workbookInfo: WorkbookQueryResult;
  onWorkbookDelete: () => void;
  onEditButtonClick: () => void;
};
const QuestionTabPanelHeader: React.FC<QuestionTabPanelHeaderProps> = ({
  workbookInfo,
  onWorkbookDelete,
  onEditButtonClick,
}) => {
  const theme = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const { deleteWorkbook } = useWorkbookDelete();

  const handleWorkbookDeleteClick = () => {
    deleteWorkbook(workbookInfo.workbookId);
    toast.success('성공적으로 문제집이 삭제되었습니다.');
    onWorkbookDelete();
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          padding: 1rem 1.2rem 0 1.2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            column-gap: 0.5rem;
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
            <Chip
              css={css`
                padding: 0.4rem;
                border-radius: 0.5rem;
              `}
            >
              {workbookInfo.categoryName}
            </Chip>
            <Chip
              color="error"
              css={css`
                padding: 0.4rem;
                border-radius: 0.5rem;
              `}
            >
              {workbookInfo.isPublic ? '공개' : '비공개'}
            </Chip>
          </div>
          <div
            css={css`
              position: relative;
            `}
          >
            <Button
              onClick={toggleMenu}
              variants="secondary"
              size="sm"
              css={css`
                display: flex;
                align-items: center;
                padding: 0.5rem;
                border: none;
                background-color: inherit;
              `}
            >
              <Icon id="ellipsis-vertical" />
            </Button>
            <Menu
              open={isMenuOpen}
              closeMenu={toggleMenu}
              css={css`
                right: 0;
              `}
            >
              <MenuItem onClick={onEditButtonClick}>
                <Typography noWrap>면접 세트 편집</Typography>
              </MenuItem>
              <MenuItem onClick={handleWorkbookDeleteClick}>
                <Typography noWrap>면접 세트 삭제</Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Typography variant="title4">{workbookInfo.title}</Typography>
        <div
          css={css`
            line-height: 1.2em;
            max-height: calc(1.2em * 3);
            overflow-y: auto;
          `}
        >
          <Typography variant="body3" color={theme.colors.text.subStrong}>
            {workbookInfo.content}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default QuestionTabPanelHeader;
