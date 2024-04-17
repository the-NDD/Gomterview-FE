import { useContext } from 'react';
import { TabContext } from './index';

const useTabs = () => {
  return useContext(TabContext);
};

export default useTabs;
