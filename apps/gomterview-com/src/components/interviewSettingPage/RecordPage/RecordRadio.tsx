import { Typography, Icon, Box } from 'gomterview-design-system';
import { theme } from '@gomterview/_theme';
import { css } from '@emotion/react';
import { useModal } from '@gomterview/use-modal';
import { RequestLoginModal } from '@common/index';

type RecordRadioProps = {
  group: string;
  IconId: string;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
};

const RecordRadio: React.FC<RecordRadioProps> = ({
  group,
  IconId,
  children,
  onChange,
  defaultChecked,
  disabled,
}) => {
  const { openModal, closeModal } = useModal(() => (
    <RequestLoginModal closeModal={closeModal} />
  ));

  return (
    <>
      <input
        id={`record-${IconId}`}
        onChange={onChange}
        type="radio"
        name={group}
        defaultChecked={defaultChecked}
        disabled={disabled}
        css={css`
          display: none;
          &:checked + label > div {
            border-left: 16px solid ${theme.colors.point.primary.default};
          }
        `}
      />
      <label
        htmlFor={`record-${IconId}`}
        onClick={() => disabled && openModal()}
      >
        <Box
          css={css`
            display: flex;
            align-items: center;
            padding: 0.8rem 3rem;
            gap: 3rem;
            transition: background-color 0.15s ease-in-out;

            &:hover {
              background-color: ${theme.colors.surface.inner};
            }
            &:active {
              transform: translateY(0.25rem);
            }
          `}
        >
          <Icon id={IconId} width="3rem" height="3rem" />
          <Typography variant="title3" component="p">
            {children}
          </Typography>
        </Box>
      </label>
    </>
  );
};

export default RecordRadio;
