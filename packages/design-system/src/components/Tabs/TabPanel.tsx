import { HTMLElementTypes } from '@/types/utils';
import useTabs from '@/components/Tabs/useTabs';

type TabPanelProps = {
  children: React.ReactNode;
  value: string;
} & HTMLElementTypes<HTMLDivElement>;

const TabPanel: React.FC<TabPanelProps> = ({ children, value, ...args }) => {
  const { currentValue } = useTabs();

  if (currentValue !== value) return null;
  return <div {...args}>{children}</div>;
};

export default TabPanel;
