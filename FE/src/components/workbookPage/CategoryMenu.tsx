import { css } from '@emotion/react';
import { Box, SelectionBox, Typography } from '@foundation/index';
import { ResponsiveMenu } from '@common/index';
import { Tabs } from '@foundation/index';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';
import useBreakpoint from '@hooks/useBreakPoint';
import { SyntheticEvent } from 'react';

type CategoryMenuProps = {
  handleTabChange: (_: SyntheticEvent, v: string) => void;
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ handleTabChange }) => {
  const { data: categories } = useCategoryQuery();

  const isDeviceBreakpoint = useBreakpoint();

  return (
    <Tabs initialValue="0">
      <ResponsiveMenu
        css={css`
          margin-bottom: 1.25rem;
        `}
      >
        <Box
          css={css`
            display: flex;
            align-items: center;
            padding: ${isDeviceBreakpoint('laptop')
              ? '0rem 1rem'
              : '1rem 0rem'};
          `}
        >
          <Tabs.TabList
            name="my-page"
            gap="1rem"
            css={css`
              display: ${isDeviceBreakpoint('laptop') ? 'flex' : 'block'};
            `}
            onTabChange={handleTabChange}
          >
            <Tabs.Tab value="" key="0">
              <SelectionBox
                id={`category-all`}
                name="category-list"
                lineDirection={isDeviceBreakpoint('laptop') ? 'bottom' : 'left'}
                defaultChecked={true}
                css={css`
                  padding: 0.5rem 1rem;
                `}
              >
                <Typography variant="title4">ALL</Typography>
              </SelectionBox>
            </Tabs.Tab>
            {categories?.map((category) => (
              <Tabs.Tab value={category.id.toString()} key={category.id}>
                <SelectionBox
                  id={`category-${category.id.toString()}`}
                  name="category-list"
                  lineDirection={
                    isDeviceBreakpoint('laptop') ? 'bottom' : 'left'
                  }
                  css={css`
                    padding: 0.5rem 1rem;
                  `}
                >
                  <Typography variant="title4">{category.name}</Typography>
                </SelectionBox>
              </Tabs.Tab>
            ))}
          </Tabs.TabList>
        </Box>
      </ResponsiveMenu>
    </Tabs>
  );
};

export default CategoryMenu;
