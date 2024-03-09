import { useContext } from 'react';
import { TabContext } from '@/components/Tabs/index';

const useTabs = () => {
  return useContext(TabContext);
};

export default useTabs;
