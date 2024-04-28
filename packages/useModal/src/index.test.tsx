import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalProvider from './modalProvider';
import useModal from './useModal';
import '@testing-library/jest-dom';

const TestModalComponent = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div>
      Test Modal<button onClick={closeModal}>closeModal</button>
    </div>
  );
};

const TestComponent = () => {
  const { closeModal, openModal } = useModal(() => (
    <TestModalComponent closeModal={closeModal} />
  ));

  return (
    <div>
      <button onClick={openModal}>open</button>
      <button onClick={closeModal}>close</button>
    </div>
  );
};

const RecursiveModal = ({
  limit,
  closeModal: closeCurrentModal,
}: {
  limit: number;
  closeModal?: () => void;
}) => {
  const { openModal, closeModal } = useModal(
    () =>
      limit > 0 && <RecursiveModal limit={limit - 1} closeModal={closeModal} />
  );

  if (limit <= 0) return;
  return (
    <div>
      <h3>Modal Level {limit}</h3>
      {limit - 1 > 0 && <button onClick={openModal}>Open {limit - 1}</button>}
      {closeCurrentModal && (
        <button onClick={closeCurrentModal}>Close {limit}</button>
      )}
    </div>
  );
};

const renderWithModalProvider = (children: React.ReactNode) => {
  return render(<ModalProvider>{children}</ModalProvider>);
};

describe('useModal의 기본 동작 테스트', () => {
  it('openModal 호출시 Modal이 랜더링 된다.', async () => {
    //arrange: 테스트 환경 구성
    const user = userEvent.setup();

    // act: dom에 컴포넌트 랜더링
    renderWithModalProvider(<TestComponent />);

    const openButton = await screen.findByText('open');
    await user.click(openButton);

    // assert: 테스트 결과 확인
    expect(await screen.findByText('Test Modal')).toBeInTheDocument();
  });
  it('closeModal 호출시 Modal이 사라진다.', async () => {
    //arrange: 테스트 환경 구성
    const user = userEvent.setup();

    // act: dom에 컴포넌트 랜더링
    renderWithModalProvider(<TestComponent />);
    const openButton = await screen.findByText('open');
    await user.click(openButton);

    const closeButton = await screen.findByText('closeModal');
    await user.click(closeButton);

    // assert: 테스트 결과 확인
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });
  it('openModal을 여러번 호출해도 Modal은 하나만 랜더링 된다.', async () => {
    //arrange: 테스트 환경 구성
    const user = userEvent.setup();

    // act: dom에 컴포넌트 랜더링
    renderWithModalProvider(<TestComponent />);
    const openButton = await screen.findByText('open');
    await user.click(openButton);
    await user.click(openButton);
    await user.click(openButton);
    await user.click(openButton);
    await user.click(openButton);
    await user.click(openButton);

    const modals = screen.getAllByText('Test Modal');

    // assert: 테스트 결과 확인
    expect(modals).toHaveLength(1);
  });
});

describe('useModal 추가 동작 테스트', () => {
  it('중첩적으로 Modal을 띄울수 있다.', async () => {
    //arrange: 테스트 환경 구성
    const user = userEvent.setup();

    // act: dom에 컴포넌트 랜더링
    renderWithModalProvider(<RecursiveModal limit={5} />);
    const openButton4 = await screen.findByText('Open 4');
    await user.click(openButton4);
    const openButton3 = await screen.findByText('Open 3');
    await user.click(openButton3);
    const openButton2 = await screen.findByText('Open 2');
    await user.click(openButton2);
    const openButton1 = await screen.findByText('Open 1');
    await user.click(openButton1);

    // assert: 테스트 결과 확인
    expect(await screen.findByText('Modal Level 1')).toBeInTheDocument();
    expect(await screen.findByText('Modal Level 2')).toBeInTheDocument();
    expect(await screen.findByText('Modal Level 3')).toBeInTheDocument();
    expect(await screen.findByText('Modal Level 4')).toBeInTheDocument();
    expect(await screen.findByText('Modal Level 5')).toBeInTheDocument();
  });
  it('Modal을 중첩적으로 호출했을시 마지막 호출 이전의 Modal을 닫을 수 있다.', async () => {
    //arrange: 테스트 환경 구성
    const user = userEvent.setup();

    // act: dom에 컴포넌트 랜더링
    renderWithModalProvider(<RecursiveModal limit={5} />);

    const openButton4 = await screen.findByText('Open 4');
    await user.click(openButton4);
    const openButton3 = await screen.findByText('Open 3');
    await user.click(openButton3);
    const openButton2 = await screen.findByText('Open 2');
    await user.click(openButton2);
    const openButton1 = await screen.findByText('Open 1');
    await user.click(openButton1);

    const closeButton3 = await screen.findByText('Close 3');
    const closeButton2 = await screen.findByText('Close 2');

    await user.click(closeButton2);
    await user.click(closeButton3);

    expect(await screen.findByText('Modal Level 1')).toBeInTheDocument();
    expect(await screen.findByText('Modal Level 4')).toBeInTheDocument();
    expect(await screen.findByText('Modal Level 5')).toBeInTheDocument();

    expect(screen.queryByText('Modal Level 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Level 3')).not.toBeInTheDocument();
  });
});
