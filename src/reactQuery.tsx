import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export const ReactQuery = () => {
  const { isLoading, error, data }: any = useQuery('repoData', () =>
    axios.get('/react-boilerplate-starter/sample-data').then((res) => res.data),
  );

  if (isLoading) return <div>"Loading..."</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <strong>{data.details}</strong>
    </div>
  );
};

export default ReactQuery;
