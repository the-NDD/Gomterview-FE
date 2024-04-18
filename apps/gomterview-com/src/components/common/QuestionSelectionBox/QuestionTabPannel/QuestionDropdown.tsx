import { css } from '@emotion/react';
import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Typography,
} from 'gomterview-design-system';
import { useState } from 'react';

type ConstraintField = {
  id: string | number;
  name: React.ReactNode;
};

type QuestionDropdownProps<T extends ConstraintField> = {
  selected: T;
  onChange: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: T
  ) => void;
  data: T[];
};

const QuestionDropdown = <T extends ConstraintField>({
  selected,
  onChange,
  data,
}: QuestionDropdownProps<T>) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };
  return (
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
        variants="secondary"
        onClick={toggleMenu}
      >
        {selected.name}
        <Icon id="arrow-down" />
      </Button>
      <Menu open={isOpenMenu} closeMenu={toggleMenu}>
        {data?.map((item) => (
          <MenuItem key={item.id} onClick={(e) => onChange(e, item)}>
            <Typography noWrap>{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default QuestionDropdown;
