import * as React from 'react';
import Menu from '@material-ui/icons/Menu';
import Category from '@material-ui/icons/Category';
import Bookmark from '@material-ui/icons/Bookmark';
import Info from '@material-ui/icons/Info';
import Link from '@material-ui/icons/Link';
import Home from '@material-ui/icons/Home';

export interface IconProps {
  type: string;
}

export const Icon: React.FC<IconProps> = (props) => {
  const presetIcons = {
    menu: <Menu />,
    shape: <Category />,
    bookmark: <Bookmark />,
    info: <Info />,
    link: <Link />,
    home: <Home />
  };

  const fallbackIcon = <Menu />;

  return Object.keys(presetIcons).includes(props.type) ? presetIcons[props.type] : fallbackIcon;
};
