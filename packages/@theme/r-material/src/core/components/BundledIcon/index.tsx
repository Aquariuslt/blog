import * as React from 'react';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/icons/Menu';
import StarBorder from '@material-ui/icons/StarBorder';
import Category from '@material-ui/icons/Category';
import Bookmark from '@material-ui/icons/Bookmark';
import Info from '@material-ui/icons/Info';

interface BundleIconProps {
  type: string;
  fallback?: string;
}

const FALLBACK_TYPE = 'menu';

/**
 * Provides a component with bundled icon types and fallback options
 */
const BundledIcon: React.ComponentType<BundleIconProps> = (props: BundleIconProps): JSX.Element => {
  const bundledMap = {
    menu: <Menu/>,
    chevronLeft: <ChevronLeft/>,
    starBorder: <StarBorder/>,
    expandLess: <ExpandLess/>,
    expandMore: <ExpandMore/>,
    category: <Category/>,
    bookmark: <Bookmark/>,
    info: <Info/>
  };

  const detectIconType = (): string => {
    if (Object.keys(bundledMap).includes(props.type)) {
      return props.type;
    }
    return props.fallback || FALLBACK_TYPE;
  };

  return bundledMap[detectIconType()];
};

export default BundledIcon;
