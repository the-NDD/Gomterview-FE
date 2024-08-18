import { css } from '@emotion/react';
import { theme } from '@gomterview/_theme';
import useMemberNameQuery from '@/entities/member/model/queries/useMemberNameQuery';
import { Typography } from 'gomterview-design-system';

const IntervieweeName: React.FC = () => {
  const { data } = useMemberNameQuery();

  return (
    <div
      css={css`
        max-width: 37.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;

        @media (max-width: ${theme.breakpoints.tablet}) {
          width: 9.375rem;
        }
      `}
    >
      <Typography
        noWrap
        paragraph
        variant={'title4'}
        color={theme.colors.text.white}
      >
        {data?.nickname || '면접자'}
      </Typography>
    </div>
  );
};
export default IntervieweeName;
