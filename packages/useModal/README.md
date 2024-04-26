# useModal

Allows modal components to be used without dependency on JSX.

## Example

Modal is even better when used with the Compound Component pattern

```jsx
import { ModalProvider } from '@gomterview/useModal';

function App() {
  return (
    // Provide the client to your App
    <ModalProvider>
      <Example />
    </ModalProvider>
  );
}

function Example() {
  const { openModal, closeModal } = useModal(() => {
    return (
      <div>
        <span>Modal Content</span>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    );
  });

  return <button onClick={openModal}>Open Modal</button>;
}
```

## API

### `useModal`

```tsx
const { openModal, closeModal } = useModal(() => <Component />);
```

#### Parameters

- `component: React.FC`: Use functional components as modals.

#### Return

- `openModal: () => void`: Function to show the modal.
- `closeModal: () => void`: Function to hide the modal.
