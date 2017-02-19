import React from 'react';
import CoinSlot from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <CoinSlot />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
