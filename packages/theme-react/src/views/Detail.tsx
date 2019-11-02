import * as React from 'react';
import { ApiPathProps } from '@theme-react/api';

export const Detail: React.FC<ApiPathProps> = (props) => {
  return <div>{props.apiPath}</div>;
};

export default Detail;
