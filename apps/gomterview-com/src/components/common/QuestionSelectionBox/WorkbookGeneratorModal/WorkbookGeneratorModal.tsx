import { css } from '@emotion/react';
import WorkbookAddForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookAddForm';
import ModalHeader from '@foundation/Modal/ModalHeader';
import { Modal } from 'gomterview-design-system';
import { theme } from '@styles/theme';

type WorkbookGeneratorModalProps = {
  closeModal: () => void;
};
const WorkbookGeneratorModal: React.FC<WorkbookGeneratorModalProps> = ({
  closeModal,
}) => {
  return (
    <Modal
      isOpen
      closeModal={closeModal}
      css={css`
        width: 30rem;
        @media (max-width: ${theme.breakpoints.tablet}) {
          width: 25rem;
        }
        @media (max-width: ${theme.breakpoints.mobileL}) {
          width: 100%;
          margin: 0 0.5rem;
        }
      `}
    >
      <ModalHeader closeModal={closeModal}>새 면접 세트</ModalHeader>
      <div
        css={css`
          max-height: 80vh;
          padding: 1.5rem;
        `}
      >
        <WorkbookAddForm closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default WorkbookGeneratorModal;
