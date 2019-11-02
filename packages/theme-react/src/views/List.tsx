import * as React from 'react';
import { useEffect, useState } from 'react';
import { ApiPathProps, loadApi } from '@theme-react/api';

export const List: React.FC<ApiPathProps> = (props) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    loadApi(props.apiPath).then((data) => {
      setData(data);
    });
  }, [props.apiPath]);

  return (
    <div>
      <span>{props.apiPath}</span>
    </div>
  );
};

export default List;
