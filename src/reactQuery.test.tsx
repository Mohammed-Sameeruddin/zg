import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactQuery from './reactQuery';
import React from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

test('Should return title and details', async () => {
  jest.spyOn(axios, 'get').mockImplementation(() => {
    return Promise.resolve({
      isLoading: false,
      error: false,
      data: {
        title: 'myTitle',
        details: 'myDetails',
      },
    });
  });
  render(
    <QueryClientProvider client={queryClient}>
      <ReactQuery />
    </QueryClientProvider>,
  );
  const title = await screen.findByText('myTitle');
  expect(title).toBeInTheDocument();
});
