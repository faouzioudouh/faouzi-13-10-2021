import React from 'react';
import { render, screen } from '@testing-library/react';
import { Orderbook } from '.';

test('renders learn react link', () => {
  render(<Orderbook />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
