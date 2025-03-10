import { css } from '@emotion/react';
import { Box, SelectionBox, Tabs, Typography } from 'gomterview-design-system';
import { ResponsiveMenu } from '@common/index';
import useBreakpoint from '@hooks/useBreakPoint';
import { useSuspenseGetCategoryQuery } from '@/entities/category/api/queries';

type CategoryMenuProps = {
  onTabChange: (v: string) => void;
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onTabChange }) => {
  const { data: categories } = useSuspenseGetCategoryQuery();

  const isDeviceBreakpoint = useBreakpoint();

  if (!categories) return null;

  return (
    <ResponsiveMenu
      css={css`
        margin-bottom: 1.25rem;
      `}
      className="category-menu"
    >
      <Tabs initialValue="">
        <Box
          css={css`
            display: flex;
            align-items: center;
            padding: ${isDeviceBreakpoint('laptop')
              ? '0rem 1rem'
              : '1rem 0rem'};
          `}
        >
          <div
            css={css`
              display: ${isDeviceBreakpoint('laptop') ? 'flex' : 'block'};
              gap: 1rem;
            `}
          >
            <Tabs.Tab value="" key="0">
              <SelectionBox
                id={`category-all`}
                name="category-menu"
                lineDirection={isDeviceBreakpoint('laptop') ? 'bottom' : 'left'}
                onClick={() => onTabChange('')}
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
                  name="category-menu"
                  lineDirection={
                    isDeviceBreakpoint('laptop') ? 'bottom' : 'left'
                  }
                  onClick={() => onTabChange(category.id.toString())}
                  css={css`
                    padding: 0.5rem 1rem;
                  `}
                >
                  <Typography variant="title4">{category.name}</Typography>
                </SelectionBox>
              </Tabs.Tab>
            ))}
          </div>
        </Box>
      </Tabs>
    </ResponsiveMenu>
  );
};

export default CategoryMenu;
